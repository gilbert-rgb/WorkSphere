package com.gilbert.hr_platform.auth;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthenticationRequest {

    private String username;

    private String password;
}