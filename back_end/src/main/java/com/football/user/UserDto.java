package com.football.user;

import lombok.Data;

import java.io.Serializable;

/**
 * A DTO for the {@link User} entity
 */
@Data
public class UserDto implements Serializable {
    private String id;
    private String username;
    private String phone;
    private String email;
    private String role;
    private String otpCode;
}