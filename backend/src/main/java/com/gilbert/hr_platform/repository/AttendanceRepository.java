package com.gilbert.hr_platform.repository;

import com.gilbert.hr_platform.entity.Attendance;
import com.gilbert.hr_platform.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    List<Attendance> findByEmployeeId(Long employeeId);

    /**
     * Finds the latest attendance record for an employee where they haven't checked out yet.
     * This is the "Smart" part of the checkout process.
     */
    Optional<Attendance> findTopByEmployeeAndCheckOutIsNullOrderByCheckInDesc(Employee employee);
}