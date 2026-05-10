package com.gilbert.hr_platform.service;

import com.gilbert.hr_platform.entity.Attendance;
import com.gilbert.hr_platform.entity.Employee;
import com.gilbert.hr_platform.repository.AttendanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository repo;

    // CHECK IN
    public Attendance checkIn(Employee emp) {

        Attendance attendance = Attendance.builder()
                .employee(emp)
                .checkIn(LocalDateTime.now())
                .status("PRESENT")
                .build();

        return repo.save(attendance);
    }

    // CHECK OUT
    public Attendance checkOut(Long attendanceId) {

        Attendance att = repo.findById(attendanceId)
                .orElseThrow(() -> new RuntimeException("Attendance not found"));

        att.setCheckOut(LocalDateTime.now());

        return repo.save(att);
    }

    public List<Attendance> getEmployeeAttendance(Long empId) {
        return repo.findByEmployeeId(empId);
    }
}