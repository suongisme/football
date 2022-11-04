package com.football.bill;

import com.football.bill.detail.BillDetail;
import com.football.bill.detail.BillDetailRepository;
import com.football.common.dto.ResultDTO;
import com.football.common.utils.ResultUtils;
import com.football.product.Product;
import com.football.product.ProductMapper;
import com.football.product.ProductRepository;
import com.football.validator.ValidatorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class BillService {

    private final BillRepository billRepository;
    private final BillDetailRepository billDetailRepository;
    private final ProductRepository productRepository;

    private final ValidatorService validatorService;

    private final ProductMapper productMapper;

    @Transactional
    public ResultDTO payment(PaymentDto paymentDto) {
        this.validatorService.validate(paymentDto);

        Bill bill = new Bill();
        bill.setStatus(BillStatus.PENDING.getStatus());
        bill.setCreatedDate(new Date());

        BigDecimal totalPrice = paymentDto.getCarts().stream()
                .map(cart -> {
                    Product product = this.productRepository.findById(cart.getProductId()).get();
                    cart.setProduct(this.productMapper.toDto(product));
                    if (product.getQuantity() < cart.getQuantity())
                        throw new IllegalArgumentException("Không đủ số lượng sản phẩm: " + product.getName());
                    return product.getPrice().multiply(new BigDecimal(product.getPrice().toString()));
                })
                .reduce(new BigDecimal("0"), (total, cur) -> total.add(cur));
        bill.setTotal(totalPrice);
        Bill _bill = this.billRepository.save(bill);

        List<BillDetail> billDetails = paymentDto.getCarts().stream().map(cart -> {
            BillDetail billDetail = new BillDetail();
            billDetail.setBillId(_bill.getId());
            billDetail.setQuantity(cart.getQuantity());
            billDetail.setPrice(cart.getProduct().getPrice());
            billDetail.setProductId(cart.getProductId());
            return billDetail;
        }).collect(Collectors.toList());
        this.billDetailRepository.saveAll(billDetails);

        return ResultUtils.buildSuccessResult(bill);
    }
}
