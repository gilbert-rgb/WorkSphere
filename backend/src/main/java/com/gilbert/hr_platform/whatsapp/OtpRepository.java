package com.gilbert.hr_platform.whatsapp;

import com.gilbert.hr_platform.whatsapp.OtpCode;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface OtpRepository extends JpaRepository<OtpCode, Long> {
    Optional<OtpCode> findTopByPhoneNumberOrderByCreatedAtDesc(String phoneNumber);
}