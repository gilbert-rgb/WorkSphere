package com.gilbert.hr_platform.controller;

import com.gilbert.hr_platform.entity.Attendance;
import com.gilbert.hr_platform.entity.Employee;
import com.gilbert.hr_platform.entity.User;
import com.gilbert.hr_platform.repository.AttendanceRepository;
import com.gilbert.hr_platform.repository.EmployeeRepository;
import com.gilbert.hr_platform.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceRepository attendanceRepository;
    private final AttendanceService attendanceService;
    private final EmployeeRepository employeeRepository;

    @GetMapping
    public List<Attendance> getAll() {
        return attendanceRepository.findAll();
    }

    @PostMapping("/checkin")
    public ResponseEntity<?> checkIn(@AuthenticationPrincipal User user) {
        Employee employee = employeeRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Employee not found for this user"));
        Attendance attendance = attendanceService.checkIn(employee);
        return ResponseEntity.ok(attendance);
    }

    @PutMapping("/checkout/{attendanceId}")
    public ResponseEntity<?> checkOut(@PathVariable Long attendanceId) {
        Attendance attendance = attendanceService.checkOut(attendanceId);
        return ResponseEntity.ok(attendance);
    }

    @GetMapping("/my")
    public ResponseEntity<?> myAttendance(@AuthenticationPrincipal User user) {
        Employee employee = employeeRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        return ResponseEntity.ok(attendanceService.getEmployeeAttendance(employee.getId()));
    }
}