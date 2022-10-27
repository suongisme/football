package com.football.stadium.type;

import com.football.common.dto.ResultDTO;
import com.football.common.utils.ResultUtils;
import com.football.stadium.type.detail.StadiumDetail;
import com.football.stadium.type.detail.StadiumDetailMapper;
import com.football.stadium.type.detail.StadiumDetailRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class StadiumTypeService {

    private final StadiumTypeRepository stadiumTypeRepository;
    private final StadiumDetailRepository stadiumDetailRepository;
    private final StadiumTypeMapper stadiumTypeMapper;
    private final StadiumDetailMapper stadiumDetailMapper;

    public ResultDTO<List<StadiumTypeDto>> findStadiumDetailByParentId(String stadiumId) {
        List<StadiumType> stadiumDetails = this.stadiumTypeRepository.findByStadiumId(stadiumId);
        List<StadiumTypeDto> dtos = stadiumDetails.stream().map(this.stadiumTypeMapper::toDto).collect(Collectors.toList());
        dtos.forEach(dto -> {
            List<StadiumDetail> types = this.stadiumDetailRepository.findByParentId(dto.getId());
            dto.setTypes(types.stream().map(this.stadiumDetailMapper::toDto).collect(Collectors.toList()));
        });
        return ResultUtils.buildSuccessResult(dtos);
    }
}
