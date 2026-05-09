package com.gilbert.hr_platform.whatsapp;

import org.springframework.stereotype.Service;

@Service
public class WhatsAppCommandParser {

    public String parse(String message) {

        if (message == null || message.isBlank()) {
            return "GENERAL";
        }

        message = message.toLowerCase().trim();

        // Greetings
        if (message.matches(".*(hi|hello|hey|help).*")) {
            return "GREETING";
        }

        // Leave requests - more precise matching
        if (message.contains("leave")) {
            if (message.matches(".*\\b1\\b.*day.*|.*\\b1\\b.*leave.*")) return "LEAVE_1_DAY";
            if (message.matches(".*\\b2\\b.*day.*|.*\\b2\\b.*leave.*")) return "LEAVE_2_DAYS";
            if (message.matches(".*\\b3\\b.*day.*|.*\\b3\\b.*leave.*")) return "LEAVE_3_DAYS";
            if (message.matches(".*\\b5\\b.*day.*|.*\\b5\\b.*leave.*")) return "LEAVE_5_DAYS";
            return "LEAVE_GENERAL";
        }

        // Attendance
        if (message.contains("check in") || message.contains("checkin")) {
            return "ATTENDANCE_CHECK_IN";
        }

        if (message.contains("check out") || message.contains("checkout")) {
            return "ATTENDANCE_CHECK_OUT";
        }

        // Payroll
        if (message.contains("salary") || message.contains("payroll")
                || message.contains("pay") || message.contains("payslip")) {
            return "PAYROLL_QUERY";
        }

        // Balance
        if (message.contains("leave balance") || message.contains("days left")) {
            return "LEAVE_BALANCE";
        }

        return "GENERAL";
    }
}