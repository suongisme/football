package com.football.stadium;

import com.football.common.constant.CommonConstant;
import com.football.common.constant.StatusEnum;
import com.football.common.dto.ResultDTO;
import com.football.common.dto.SearchDTO;
import com.football.common.dto.SearchResponse;
import com.football.common.utils.DateUtils;
import com.football.common.utils.ResultUtils;
import com.football.image.ImageService;
import com.football.province.Province;
import com.football.province.ProvinceRepository;
import com.football.request.RequestRepository;
import com.football.request.RequestStatus;
import com.football.stadium.AvailableStadium.Response.Detail;
import com.football.stadium.image.StadiumImage;
import com.football.stadium.image.StadiumImageRepository;
import com.football.stadium.option.StadiumOption;
import com.football.stadium.option.StadiumOptionDto;
import com.football.stadium.option.StadiumOptionMapper;
import com.football.stadium.option.StadiumOptionRepository;
import com.football.stadium.type.StadiumType;
import com.football.stadium.type.StadiumTypeDto;
import com.football.stadium.type.StadiumTypeMapper;
import com.football.stadium.type.StadiumTypeRepository;
import com.football.stadium.type.detail.StadiumDetail;
import com.football.stadium.type.detail.StadiumDetailDto;
import com.football.stadium.type.detail.StadiumDetailMapper;
import com.football.stadium.type.detail.StadiumDetailRepository;
import com.football.user.UserDto;
import com.football.user.UserService;
import com.football.validator.ValidatorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Tuple;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.text.ParseException;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
@Slf4j
public class StadiumService {

    private final UserService userService;

    private final StadiumRepository stadiumRepository;
    private final StadiumTypeRepository stadiumTypeRepository;
    private final StadiumImageRepository stadiumImageRepository;
    private final StadiumOptionRepository stadiumOptionRepository;
    private final StadiumDetailRepository stadiumDetailRepository;
    private final RequestRepository requestRepository;

    private final ImageService imageService;

    private final StadiumMapper stadiumMapper;
    private final StadiumTypeMapper stadiumTypeMapper;
    private final StadiumOptionMapper stadiumOptionMapper;

    private final ProvinceRepository provinceRepository;
    private final StadiumDetailMapper stadiumDetailMapper;
    private final ValidatorService validator;

    public ResultDTO<SearchResponse> searchStadium(SearchDTO<StadiumDto> searchDTO) {
        log.info("search stadium: {}", searchDTO);
        StadiumDto stadiumDto = searchDTO.getData();
        Pageable pageable = null;
        if (Objects.nonNull(searchDTO.getPage()) && Objects.nonNull(searchDTO.getPageSize())) {
            pageable = PageRequest.of(searchDTO.getPage() - 1, searchDTO.getPageSize());
        }

        Function<Stadium, StadiumDto> toDto = stadium -> {
            StadiumDto dto = this.stadiumMapper.toDto(stadium);
            dto.setTotalType(this.stadiumTypeRepository.findByStadiumId(stadium.getId()).size());
            Tuple minAndMax = this.stadiumDetailRepository.findMinAndMAxPriceByStadiumId(stadium.getId());
            dto.setMinPrice(minAndMax.get(0, BigDecimal.class));
            dto.setMaxPrice(minAndMax.get(1, BigDecimal.class));
            List<StadiumOption> options = this.stadiumOptionRepository.findByStadiumId(stadium.getId());
            dto.setOptions(this.stadiumOptionMapper.toDto(options));
            return dto;
        };

        Page<Stadium> stadiumPage = this.stadiumRepository.findStadium(
                stadiumDto.getProvinceId(),
                stadiumDto.getDistrictId(),
                stadiumDto.getName(),
                stadiumDto.getCreatedBy(),
                pageable
        );
        List<StadiumDto> stadium = stadiumPage.getContent().stream().map(toDto).collect(Collectors.toList());
        SearchResponse<List<StadiumDto>> response = new SearchResponse<>();
        response.setTotal(stadiumPage.getTotalElements());
        response.setData(stadium);
        return ResultUtils.buildSuccessResult(response);
    }

    public ResultDTO<SearchResponse> getMyStadium(SearchDTO<StadiumDto> searchDTO) {
        UserDto userDto = this.userService.getCurrentUser();
        StadiumDto stadiumDto = new StadiumDto();
        stadiumDto.setCreatedBy(userDto.getUsername());
        searchDTO.setData(stadiumDto);
        return this.searchStadium(searchDTO);
    }

    public ResultDTO<StadiumDto> getStadiumById(String id) {
        Stadium stadium = this.stadiumRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Không tìm thấy SVĐ"));
        StadiumDto stadiumDto = this.stadiumMapper.toDto(stadium);
        Province province = this.provinceRepository.findById(stadium.getProvinceId()).orElse(new Province());
        stadiumDto.setProvinceName(province.getName());
        return ResultUtils.buildSuccessResult(stadiumDto);
    }

    @Transactional
    public ResultDTO<StadiumDto> createStadium(StadiumDto stadiumDto) {
        log.info("create stadium");
        this.validator.validate(stadiumDto);

        UserDto currentUser = this.userService.getCurrentUser();

        String avatarUrl = this.imageService.uploadImage(stadiumDto.getAvatarFile());
        stadiumDto.setAvatarFile(null);
        Stadium stadium = this.stadiumMapper.toEntity(stadiumDto);
        stadium.setId(UUID.randomUUID().toString());
        stadium.setAvatar(avatarUrl);
        stadium.setCreatedBy(currentUser.getUsername());
        stadium.setStatus(StatusEnum.ACTIVE.getStatus());
        stadium.setCreatedDate(new Timestamp(System.currentTimeMillis()));
        stadium = this.stadiumRepository.save(stadium);

        List<StadiumTypeDto> details = stadiumDto.getDetails();
        for (StadiumTypeDto detailDto : details) {
            this.validator.validate(detailDto);
            StadiumType stadiumType = this.stadiumTypeMapper.toEntity(detailDto);
            stadiumType.setStadiumId(stadium.getId());
            stadiumType = this.stadiumTypeRepository.save(stadiumType);

            for (StadiumDetailDto detail : detailDto.getTypes()) {
                StadiumDetail stadiumDetail = this.stadiumDetailMapper.toEntity(detail);
                stadiumDetail.setParentId(stadiumType.getId());
                this.stadiumDetailRepository.save(stadiumDetail);
            }
        }

        List<StadiumOptionDto> options = stadiumDto.getOptions();
        for (StadiumOptionDto option : options) {
            StadiumOption stadiumOption = this.stadiumOptionMapper.toEntity(option);
            stadiumOption.setStadiumId(stadium.getId());
            this.stadiumOptionRepository.save(stadiumOption);
        }

        List<MultipartFile> images = stadiumDto.getImages();
        for (MultipartFile imageDto : images) {
            String url = this.imageService.uploadImage(imageDto);
            StadiumImage stadiumImage = new StadiumImage();
            stadiumImage.setStadiumId(stadium.getId());
            stadiumImage.setImage(url);
            this.stadiumImageRepository.save(stadiumImage);
        }

        return ResultUtils.buildSuccessResult(stadiumDto);
    }

    public List<AvailableStadium.Response> findAvailableStadium(AvailableStadium.Request avaRequest) throws ParseException {
        log.info("get available stadium {}", avaRequest);
        this.validator.validate(avaRequest);

        Date now = new Date();
        if (StringUtils.isBlank(avaRequest.getStartDate())) {
            avaRequest.setStartDate(DateUtils.dateToString(now));
        }

        if (StringUtils.isBlank(avaRequest.getEndDate())) {
            now.setTime(now.getTime() + CommonConstant.ONE_WEEK_MILI);
            avaRequest.setEndDate(DateUtils.dateToString(now));
        }

        this.stadiumRepository.findById(avaRequest.getStadiumId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy sân vận động"));

        List<StadiumDetail> stadiumDetails = this.stadiumDetailRepository
                .findByStadiumId(avaRequest.getStadiumId(),avaRequest.getStartTime(), avaRequest.getEndTime());
        long duration = DateUtils.calculateDurationDaysBetween(avaRequest.getStartDate(), avaRequest.getEndDate());

        Calendar calendar = Calendar.getInstance();
        calendar.setLenient(true);
        calendar.setTime(DateUtils.stringToDate(avaRequest.getStartDate()));
        return IntStream.rangeClosed(1, (int) duration)
                .mapToObj(i -> calendar.getTime())
                .map(date -> {
                    AvailableStadium.Response response = new AvailableStadium.Response();
                    response.setDate(DateUtils.dateToString(date));
                    List<Detail> details = stadiumDetails.stream()
                            .filter(d ->
                                !this.requestRepository.existsByStadiumDetailIdAndHireDateAndStatus(d.getId(), calendar.getTime(), RequestStatus.APPROVED.getStatus()
                            ))
                            .map(d -> new Detail(d.getId(), d.getStartTime().toString(), d.getEndTime().toString(), d.getPrice()))
                            .collect(Collectors.toList());
                    response.setChildren(details);
                    calendar.add(Calendar.DAY_OF_MONTH, 1);
                    return response;
                })
                .collect(Collectors.toList());

    }
}
