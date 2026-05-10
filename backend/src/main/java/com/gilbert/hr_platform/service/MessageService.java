package com.gilbert.hr_platform.service;

import com.gilbert.hr_platform.entity.Employee;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final EmployeeService employeeService;
    private final LeaveRequestService leaveRequestService;

    public String process(String phone, String message) {

        Employee emp = employeeService.getByWhatsapp(phone);

        message = message.toLowerCase();

        // APPLY LEAVE
        if (message.startsWith("apply")) {
            return handleLeave(emp, message);
        }

        // STATUS
        if (message.equals("status")) {
            return "Check dashboard or ask HR.";
        }

        return "Unknown command. Try: apply YYYY-MM-DD YYYY-MM-DD reason";
    }

    private String handleLeave(Employee emp, String msg) {
        try {
            String[] parts = msg.split(" ");

            LocalDate start = LocalDate.parse(parts[1]);
            LocalDate end = LocalDate.parse(parts[2]);

            String reason = String.join(" ", java.util.Arrays.copyOfRange(parts, 3, parts.length));

            leaveRequestService.applyLeave(emp, start, end, reason);

            return "Leave request submitted successfully";

        } catch (Exception e) {
            return "Format: apply YYYY-MM-DD YYYY-MM-DD reason";
        }
    }
}