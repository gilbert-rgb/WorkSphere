package com.gilbert.hr_platform.whatsapp;

import com.gilbert.hr_platform.whatsapp.OtpService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/otp")
@RequiredArgsConstructor
public class OtpController {

    private final OtpService otpService;

    @PostMapping("/send")
    public ResponseEntity<String> sendOtp(@RequestParam String phoneNumber) {
        otpService.sendOtp(phoneNumber);
        return ResponseEntity.ok("OTP sent to " + phoneNumber);
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyOtp(
            @RequestParam String phoneNumber,
            @RequestParam String code
    ) {
        boolean valid = otpService.verifyOtp(phoneNumber, code);
        if (valid) {
            return ResponseEntity.ok("✅ OTP verified successfully");
        }
        return ResponseEntity.badRequest().body("❌ Invalid or expired OTP");
    }
}