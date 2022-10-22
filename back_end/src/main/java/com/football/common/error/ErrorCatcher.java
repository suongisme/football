package com.football.common.error;

import com.football.common.dto.ResultDTO;
import com.football.common.utils.ResultUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AccountExpiredException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class ErrorCatcher {

    @ExceptionHandler(value = {Exception.class})
    public ResponseEntity exception(Exception ex) {
        log.error(ex.getMessage(), ex);
        ResultDTO<String> result = ResultUtils.buildErrorResult("Có lỗi xảy ra!");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
    }

    @ExceptionHandler(value = {IllegalArgumentException.class})
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ResponseEntity validateException(IllegalArgumentException ex) {
        log.error(ex.getMessage(), ex);
        ResultDTO<String> result = ResultUtils.buildErrorValidateResult(ex.getMessage());
        return ResponseEntity.badRequest().body(result);
    }

    @ExceptionHandler(value = {BadCredentialsException.class})
    public ResponseEntity badCredentialsException(BadCredentialsException ex) {
        ResultDTO<String> resultDto = ResultUtils.buildErrorResult(ex.getMessage());
        return ResponseEntity.status(resultDto.getStatus()).body(resultDto);
    }

    @ExceptionHandler(value = {LockedException.class})
    public ResponseEntity lockException(LockedException ex) {
        ResultDTO<String> result = ResultUtils.buildErrorValidateResult(ex.getMessage());
        result.setStatus(HttpStatus.UNAUTHORIZED);
        result.setMessage("Tài khoản chưa được kích hoạt");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
    }

    @ExceptionHandler(value = {AccountExpiredException.class})
    public ResponseEntity AccountExpiredException(AccountExpiredException ex) {
        ResultDTO<String> result = ResultUtils.buildErrorValidateResult(ex.getMessage());
        result.setStatus(HttpStatus.LOCKED);
        result.setMessage("Tài khoản đã bị vô hiệu hóa");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
    }
}
