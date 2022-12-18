package com.football.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto implements Serializable {
    private String id;
    private String username;
    private String phone;
    private String email;
    private String role;
    private String otpCode;
    private Integer status;
    private String fullName;

    @JsonIgnore
    private Map<String, String> errors;
}