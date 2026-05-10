package com.gilbert.hr_platform.whatsapp;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/whatsapp")
@RequiredArgsConstructor
@Slf4j
public class WhatsappController {

    private final WhatsappService service;

    // Manual send - for testing
    @PostMapping("/send")
    public ResponseEntity<String> sendMessage(
            @RequestParam String to,
            @RequestParam String message
    ) {
        log.info("📤 Manual send to: {}", to);
        boolean sent = service.sendMessage(to, message);
        return sent
                ? ResponseEntity.ok("✅ Message sent successfully")
                : ResponseEntity.internalServerError().body("❌ Failed to send message");
    }

    // Twilio webhook - must return TwiML or plain OK
    @PostMapping(value = "/webhook", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<String> receiveMessage(
            @RequestParam("From") String from,
            @RequestParam("Body") String body
    ) {
        log.info("📩 Webhook received from: {}", from);
        service.processIncomingMessage(from, body);
        return ResponseEntity.ok("OK");
    }
}