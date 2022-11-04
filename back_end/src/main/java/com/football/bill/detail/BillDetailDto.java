package com.football.bill.detail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * A DTO for the {@link BillDetail} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BillDetailDto implements Serializable {
    private Long id;
    private String billId;
    private String productId;
    private BigDecimal price;
    private Long quantity;
}