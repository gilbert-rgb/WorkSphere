package com.gilbert.hr_platform.whatsapp;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter
public class WhatsappConfig {

    @Value("${twilio.account-sid}")   // ✅
    private String accountSid;

    @Value("${twilio.auth-token}")    // ✅
    private String authToken;

    @Value("${twilio.whatsapp-from}") // ✅
    private String from;
}