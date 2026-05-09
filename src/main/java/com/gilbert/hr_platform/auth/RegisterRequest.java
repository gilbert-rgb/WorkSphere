package com.gilbert.hr_platform.auth;

import com.gilbert.hr_platform.entity.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {

    private String username;

    private String password;

    // Optional role during registration
    private Role role;

    // Optional employee link
    private Long employeeId;
}