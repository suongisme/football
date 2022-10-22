package com.football.stadium.detail;

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
public class StadiumDetailService {

    private final StadiumDetailRepository stadiumDetailRepository;
    private final StadiumDetailMapper stadiumDetailMapper;

    public ResultDTO<List<StadiumDetailDto>> findStadiumDetailByParentId(String stadiumId) {
        List<StadiumDetail> stadiumDetails = this.stadiumDetailRepository.findByStadiumId(stadiumId);
        List<StadiumDetailDto> dtos = stadiumDetails.stream().map(this.stadiumDetailMapper::toDto).collect(Collectors.toList());
        return ResultUtils.buildSuccessResult(dtos);
    }
}
