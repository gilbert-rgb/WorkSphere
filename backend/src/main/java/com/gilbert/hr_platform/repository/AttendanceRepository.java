package com.gilbert.hr_platform.repository;

import com.gilbert.hr_platform.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    List<Attendance> findByEmployeeId(Long employeeId);
}