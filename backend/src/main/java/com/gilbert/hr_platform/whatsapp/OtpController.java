package com.gilbert.hr_platform.whatsapp;

import com.gilbert.hr_platform.config.JwtService;
import com.gilbert.hr_platform.entity.Employee;
import com.gilbert.hr_platform.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/otp")
@RequiredArgsConstructor
@Slf4j
public class OtpController {

    private final OtpService otpService;
    private final JwtService jwtService;
    private final EmployeeRepository employeeRepository;

    // normalize phone - handle + encoding issue
    private String normalizePhone(String phoneNumber) {
        String cleaned = phoneNumber.trim()
                .replace("whatsapp:", "")
                .replace("whatsapp%3A", "");
        if (!cleaned.startsWith("+")) {
            cleaned = "+" + cleaned;
        }
        log.info("📱 Normalized phone: {}", cleaned);
        return cleaned;
    }

    // SEND OTP
    @PostMapping("/send")
    public ResponseEntity<?> sendOtp(@RequestParam String phoneNumber) {
        String normalizedPhone = normalizePhone(phoneNumber);
        log.info("📤 OTP send request for: {}", normalizedPhone);

        boolean exists = employeeRepository.findByWhatsappNumber(normalizedPhone).isPresent();
        if (!exists) {
            log.warn("❌ No employee found for: {}", normalizedPhone);
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "No account found with this WhatsApp number: " + normalizedPhone));
        }

        otpService.sendOtp(normalizedPhone);
        return ResponseEntity.ok(Map.of("message", "OTP sent to " + normalizedPhone));
    }

    // VERIFY OTP
    @PostMapping("/verify")
    public ResponseEntity<?> verifyOtp(
            @RequestParam String phoneNumber,
            @RequestParam String code
    ) {
        String normalizedPhone = normalizePhone(phoneNumber);
        log.info("🔐 OTP verify request for: {}", normalizedPhone);

        boolean valid = otpService.verifyOtp(normalizedPhone, code);
        if (!valid) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Invalid or expired OTP"));
        }

        Employee employee = employeeRepository.findByWhatsappNumber(normalizedPhone)
                .orElse(null);

        if (employee == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Employee not found for: " + normalizedPhone));
        }

        if (employee.getUser() == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "No user account linked to this number. Please contact HR."));
        }

        String token = jwtService.generateToken(employee.getUser());
        log.info("✅ OTP login successful for: {}", employee.getUser().getUsername());

        return ResponseEntity.ok(Map.of(
                "token", token,
                "username", employee.getUser().getUsername(),
                "role", employee.getUser().getRole().name()
        ));
    }
}