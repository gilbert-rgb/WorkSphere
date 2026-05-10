package com.gilbert.hr_platform.whatsapp;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class WhatsappService {

    private final WhatsAppCommandParser parser;

    @Value("${twilio.account-sid}")
    private String accountSid;

    @Value("${twilio.auth-token}")
    private String authToken;

    @Value("${twilio.whatsapp-from}")
    private String from;

    @PostConstruct
    public void init() {
        Twilio.init(accountSid, authToken);
        log.info("Twilio initialized with number: {}", from);
    }

    // =========================
    // PROCESS INCOMING MESSAGE
    // =========================
    public void processIncomingMessage(String fromNumber, String body) {
        log.info("📩 Incoming from: {} => {}", fromNumber, body);

        String intent = parser.parse(body);
        log.info("🎯 Intent detected: {}", intent);

        String reply = switch (intent) {
            case "GREETING" -> """
                    👋 Hi! I'm your HR Assistant Bot.
                    Here's what I can help with:
                    • *Check in* - Record your arrival
                    • *Check out* - Record your departure
                    • *Leave for X days* - Request leave
                    • *Leave balance* - Check remaining days
                    • *Salary* - Payroll information
                    """;
            case "LEAVE_1_DAY"   -> "✅ Leave request for *1 day* received. Pending manager approval.";
            case "LEAVE_2_DAYS"  -> "✅ Leave request for *2 days* received. Pending manager approval.";
            case "LEAVE_3_DAYS"  -> "✅ Leave request for *3 days* received. Pending manager approval.";
            case "LEAVE_4_DAYS"  -> "✅ Leave request for *4 days* received. Pending manager approval.";
            case "LEAVE_5_DAYS"  -> "✅ Leave request for *5 days* received. Pending manager approval.";
            case "LEAVE_GENERAL" -> "📅 Please specify how many days e.g. *'I need leave for 3 days'*";
            case "LEAVE_BALANCE" -> "📊 You have *12 leave days* remaining this year."; // wire to DB later
            case "ATTENDANCE_CHECK_IN"  -> "✅ *Check-in* recorded at " + java.time.LocalTime.now().withNano(0) + ". Have a productive day!";
            case "ATTENDANCE_CHECK_OUT" -> "✅ *Check-out* recorded at " + java.time.LocalTime.now().withNano(0) + ". See you tomorrow!";
            case "PAYROLL_QUERY" -> "💰 Your latest payslip is available on the HR portal. Contact HR for details.";
            default -> "🤖 I didn't understand that. Type *'help'* to see available commands.";
        };

        // clean the number before sending
        String cleanNumber = fromNumber.replace("whatsapp:", "");
        sendMessage(cleanNumber, reply);
    }

    // =========================
    // SEND MESSAGE
    // =========================
    public boolean sendMessage(String to, String messageBody) {
        try {
            // handle both cases - with or without whatsapp: prefix
            String formattedTo = to.startsWith("whatsapp:") ? to : "whatsapp:" + to;

            Message.creator(
                    new PhoneNumber(formattedTo),
                    new PhoneNumber(from),
                    messageBody
            ).create();

            log.info("✅ Message sent to: {}", formattedTo);
            return true;

        } catch (Exception e) {
            log.error("❌ Error sending WhatsApp message to {}: {}", to, e.getMessage());
            return false;
        }
    }
}