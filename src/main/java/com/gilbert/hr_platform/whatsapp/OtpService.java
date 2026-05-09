package com.gilbert.hr_platform.whatsapp;

import com.gilbert.hr_platform.whatsapp.OtpCode;
import com.gilbert.hr_platform.whatsapp.OtpRepository;
import com.gilbert.hr_platform.whatsapp.WhatsappService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class OtpService {

    private final OtpRepository otpRepository;
    private final WhatsappService whatsappService;

    // GENERATE AND SEND OTP
    public void sendOtp(String phoneNumber) {
        String code = String.format("%06d", new Random().nextInt(999999));

        OtpCode otp = OtpCode.builder()
                .phoneNumber(phoneNumber)
                .code(code)
                .used(false)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(5))
                .build();

        otpRepository.save(otp);

        String message = "🔐 *HR Platform OTP*\n\n" +
                "Your verification code is: *" + code + "*\n" +
                "This code expires in *5 minutes*.\n\n" +
                "If you did not request this, please ignore.";

        whatsappService.sendMessage(phoneNumber, message);
        log.info("OTP sent to {}", phoneNumber);
    }

    // VERIFY OTP
    public boolean verifyOtp(String phoneNumber, String code) {
        return otpRepository
                .findTopByPhoneNumberOrderByCreatedAtDesc(phoneNumber)
                .map(otp -> {
                    if (otp.isUsed()) {
                        log.warn("OTP already used for {}", phoneNumber);
                        return false;
                    }
                    if (otp.getExpiresAt().isBefore(LocalDateTime.now())) {
                        log.warn("OTP expired for {}", phoneNumber);
                        return false;
                    }
                    if (!otp.getCode().equals(code)) {
                        log.warn("Wrong OTP for {}", phoneNumber);
                        return false;
                    }
                    otp.setUsed(true);
                    otpRepository.save(otp);
                    log.info("OTP verified for {}", phoneNumber);
                    return true;
                })
                .orElse(false);
    }
}