package com.gilbert.hr_platform.whatsapp;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "otp_codes")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class OtpCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String phoneNumber;
    private String code;
    private boolean used;
    private LocalDateTime expiresAt;
    private LocalDateTime createdAt;
}