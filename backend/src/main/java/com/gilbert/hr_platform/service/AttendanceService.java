package com.gilbert.hr_platform.service;

import com.gilbert.hr_platform.entity.Attendance;
import com.gilbert.hr_platform.entity.Employee;
import com.gilbert.hr_platform.repository.AttendanceRepository;
import com.gilbert.hr_platform.whatsapp.WhatsappService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository repo;
    private final WhatsappService whatsappService;
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");

    // CHECK IN
    public Attendance checkIn(Employee emp) {
        // Optional: Check if already checked in today to prevent duplicates
        Attendance attendance = Attendance.builder()
                .employee(emp)
                .checkIn(LocalDateTime.now())
                .status("PRESENT")
                .build();

        Attendance saved = repo.save(attendance);

        if (emp.getWhatsappNumber() != null) {
            String time = saved.getCheckIn().format(formatter);
            whatsappService.sendMessage(emp.getWhatsappNumber(),
                    "☀️ *Check-in Successful*\nTime: " + time);
        }
        return saved;
    }

    // CHECK OUT (Smart Version)
    public Attendance checkOut(Employee emp) {
        // Find the most recent record for this employee that has no check-out time
        Attendance att = repo.findTopByEmployeeAndCheckOutIsNullOrderByCheckInDesc(emp)
                .orElseThrow(() -> new RuntimeException("No active check-in found for " + emp.getFirstName()));

        att.setCheckOut(LocalDateTime.now());
        att.setStatus("COMPLETED");

        Attendance saved = repo.save(att);

        // Notify via WhatsApp
        if (emp.getWhatsappNumber() != null) {
            String time = saved.getCheckOut().format(formatter);
            whatsappService.sendMessage(emp.getWhatsappNumber(),
                    "🌙 *Check-out Successful*\nTime: " + time + "\nHave a great evening!");
        }

        return saved;
    }

    public List<Attendance> getEmployeeAttendance(Long empId) {
        return repo.findByEmployeeId(empId);
    }
}