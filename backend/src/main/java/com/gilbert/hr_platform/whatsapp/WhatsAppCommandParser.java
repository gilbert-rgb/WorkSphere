package com.gilbert.hr_platform.whatsapp;

import org.springframework.stereotype.Service;

@Service
public class WhatsAppCommandParser {

    public String parse(String message) {
        if (message == null || message.isBlank()) return "GENERAL";
        message = message.toLowerCase().trim();

        if (message.matches(".*(hi|hello|hey|help).*")) return "GREETING";

        if (message.contains("check in") || message.contains("checkin")) return "ATTENDANCE_CHECK_IN";
        if (message.contains("check out") || message.contains("checkout")) return "ATTENDANCE_CHECK_OUT";

        if (message.contains("salary") || message.contains("payroll")
                || message.contains("pay") || message.contains("payslip")) return "PAYROLL_QUERY";

        if (message.contains("leave balance") || message.contains("days left")) return "LEAVE_BALANCE";

        if (message.contains("leave")) return "LEAVE_REQUEST";

        return "GENERAL";
    }
}