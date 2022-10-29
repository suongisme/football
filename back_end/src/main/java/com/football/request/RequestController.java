package com.football.request;

import com.football.common.dto.ResultDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/requests")
@RequiredArgsConstructor
public class RequestController {

    private final RequestService requestService;

    @GetMapping("/{stadiumId}")
    public ResponseEntity getStadiumRequest(@PathVariable String stadiumId) {
        return ResponseEntity.ok(this.requestService.getStadiumRequest(stadiumId));
    }

    @PostMapping
    public ResponseEntity requestStadium(@RequestBody RequestDto requestDto) {
        ResultDTO resultDTO = this.requestService.requestStadium(requestDto);
        return ResponseEntity.ok(resultDTO.getData());
    }

    @PostMapping("/approve")
    public ResponseEntity approveRequest(@RequestBody PendingRequestDto pendingRequestDto) {
        ResultDTO resultDTO = this.requestService.approveRequest(pendingRequestDto);
        return ResponseEntity.status(resultDTO.getStatus()).body(resultDTO);
    }
}
