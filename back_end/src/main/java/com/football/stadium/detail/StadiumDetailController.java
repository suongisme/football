package com.football.stadium.detail;

import com.football.common.dto.ResultDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/stadium-detail")
@RequiredArgsConstructor
public class StadiumDetailController {

    private final StadiumDetailService stadiumDetailService;

    @GetMapping("/{stadiumId}")
    public ResponseEntity getStadiumDetailByParentId(@PathVariable String stadiumId) {
        ResultDTO<List<StadiumDetailDto>> result = this.stadiumDetailService.findStadiumDetailByParentId(stadiumId);
        return ResponseEntity.ok(result);
    }

}
