package com.football.stadium.image;

import com.football.common.dto.ResultDTO;
import com.football.common.utils.ResultUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class StadiumImageService {

    private final StadiumImageRepository stadiumImageRepository;
    private final StadiumImageMapper stadiumImageMapper;

    public ResultDTO<List<StadiumImageDto>> findStadiumImageByParentId(String stadiumId) {
        List<StadiumImage> stadiunImage = this.stadiumImageRepository.findByStadiumId(stadiumId);
        List<StadiumImageDto> dtos = stadiunImage.stream().map(this.stadiumImageMapper::toDto).collect(Collectors.toList());
        return ResultUtils.buildSuccessResult(dtos);
    }

}
