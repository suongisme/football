package com.football.stadium.option;

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
public class StadiumOptionService {

    private final StadiumOptionRepository stadiumOptionRepository;
    private final StadiumOptionMapper stadiumOptionMapper;

    public ResultDTO<List<StadiumOptionDto>> findOptionByParentId(String stadiumId) {
        List<StadiumOption> stadiumOptions = this.stadiumOptionRepository.findByStadiumId(stadiumId);
        List<StadiumOptionDto> dtos = stadiumOptions.stream().map(this.stadiumOptionMapper::toDto).collect(Collectors.toList());
        return ResultUtils.buildSuccessResult(dtos);
    }
}
