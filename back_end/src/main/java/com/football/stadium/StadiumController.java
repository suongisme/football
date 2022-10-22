package com.football.stadium;

import com.football.common.dto.ResultDTO;
import com.football.common.dto.SearchDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stadiums")
@RequiredArgsConstructor
public class StadiumController {

    private final StadiumService stadiumService;

    @PostMapping("/search-stadium")
    public ResponseEntity searchStadium(@RequestBody SearchDTO<StadiumDto> searchDTO) {
        ResultDTO<List<StadiumDto>> result = this.stadiumService.searchStadium(searchDTO);
        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @PostMapping
    public ResponseEntity createStadium(@RequestBody StadiumDto stadiumDto) {
        ResultDTO<StadiumDto> result = this.stadiumService.createStadium(stadiumDto);
        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @PostMapping("/mine")
    public ResponseEntity getMyStadium(@RequestBody SearchDTO<StadiumDto> searchDTO) {
        ResultDTO<List<StadiumDto>> myStadium = this.stadiumService.getMyStadium(searchDTO);
        return ResponseEntity.ok(myStadium);
    }

    @GetMapping("/{id}")
    public ResponseEntity getStadiumById(@PathVariable String id) {
        ResultDTO<StadiumDto> result = this.stadiumService.getStadiumById(id);
        return ResponseEntity.ok(result);
    }
}
