package com.football.stadium;

import com.football.common.dto.ResultDTO;
import com.football.common.dto.SearchDTO;
import com.football.common.utils.ResultUtils;
import com.football.image.ImageService;
import com.football.stadium.detail.StadiumDetail;
import com.football.stadium.detail.StadiumDetailDto;
import com.football.stadium.detail.StadiumDetailMapper;
import com.football.stadium.detail.StadiumDetailRepository;
import com.football.stadium.image.StadiumImage;
import com.football.stadium.image.StadiumImageDto;
import com.football.stadium.image.StadiumImageMapper;
import com.football.stadium.image.StadiumImageRepository;
import com.football.stadium.option.StadiumOption;
import com.football.stadium.option.StadiumOptionDto;
import com.football.stadium.option.StadiumOptionMapper;
import com.football.stadium.option.StadiumOptionRepository;
import com.football.user.UserDto;
import com.football.user.UserService;
import com.football.validator.ValidatorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class StadiumService {

    private final UserService userService;

    private final StadiumRepository stadiumRepository;
    private final StadiumDetailRepository stadiumDetailRepository;
    private final StadiumImageRepository stadiumImageRepository;
    private final StadiumOptionRepository stadiumOptionRepository;

    private final ImageService imageService;

    private final StadiumMapper stadiumMapper;
    private final StadiumDetailMapper stadiumDetailMapper;
    private final StadiumOptionMapper stadiumOptionMapper;
    private final StadiumImageMapper stadiumImageMapper;
    private final ValidatorService validator;

    public ResultDTO<List<StadiumDto>> searchStadium(SearchDTO<StadiumDto> searchDTO) {
        log.info("search stadium: {}", searchDTO);
        StadiumDto stadiumDto = searchDTO.getData();
        Pageable pageable = null;
        if (Objects.nonNull(searchDTO.getPage()) && Objects.nonNull(searchDTO.getPageSize())) {
            pageable = PageRequest.of(searchDTO.getPage() - 1, searchDTO.getPageSize());
        }
        List<StadiumDto> stadium = this.stadiumRepository.findStadium(
                stadiumDto.getProvinceId(),
                stadiumDto.getDistrictId(),
                stadiumDto.getName(),
                stadiumDto.getCreatedBy(),
                pageable
        ).stream().map(this.stadiumMapper::toDto).collect(Collectors.toList());
        return ResultUtils.buildSuccessResult(stadium);
    }

    public ResultDTO<List<StadiumDto>> getMyStadium(SearchDTO<StadiumDto> searchDTO) {
        UserDto userDto = this.userService.getCurrentUser();
        StadiumDto stadiumDto = new StadiumDto();
        stadiumDto.setCreatedBy(userDto.getUsername());
        searchDTO.setData(stadiumDto);
        return this.searchStadium(searchDTO);
    }

    public ResultDTO<StadiumDto> getStadiumById(String id) {
        Stadium stadium = this.stadiumRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Không tìm thấy SVĐ"));
        return ResultUtils.buildSuccessResult(this.stadiumMapper.toDto(stadium));
    }

    @Transactional
    public ResultDTO<StadiumDto> createStadium(StadiumDto stadiumDto) {
        log.info("create stadium");
        this.validator.validate(stadiumDto);

        UserDto currentUser = this.userService.getCurrentUser();

        String avatarUrl = this.imageService.uploadImage(stadiumDto.getAvatarFile());

        Stadium stadium = this.stadiumMapper.toEntity(stadiumDto);
        stadium.setId(UUID.randomUUID().toString());
        stadium.setAvatar(avatarUrl);
        stadium.setCreatedBy(currentUser.getUsername());
        stadium = this.stadiumRepository.save(stadium);

        List<StadiumDetailDto> details = stadiumDto.getDetails();
        for (StadiumDetailDto detailDto : details) {
            this.validator.validate(detailDto);
            StadiumDetail stadiumDetail = this.stadiumDetailMapper.toEntity(detailDto);
            stadiumDetail.setStadiumId(stadium.getId());
            this.stadiumDetailRepository.save(stadiumDetail);
        }

        List<StadiumOptionDto> options = stadiumDto.getOptions();
        for (StadiumOptionDto option : options) {
            StadiumOption stadiumOption = this.stadiumOptionMapper.toEntity(option);
            stadiumOption.setStadiumId(stadium.getId());
            this.stadiumOptionRepository.save(stadiumOption);
        }

        List<StadiumImageDto> images = stadiumDto.getImages();
        for (StadiumImageDto imageDto : images) {
            String url = this.imageService.uploadImage(imageDto.getFile());
            StadiumImage stadiumImage = this.stadiumImageMapper.toEntity(imageDto);
            stadiumImage.setImage(url);
            this.stadiumImageRepository.save(stadiumImage);
        }

        return ResultUtils.buildSuccessResult(stadiumDto);
    }
}
