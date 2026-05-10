package com.gilbert.hr_platform;

import com.gilbert.hr_platform.entity.Employee;
import com.gilbert.hr_platform.entity.LeaveRequest;
import com.gilbert.hr_platform.entity.User;
import com.gilbert.hr_platform.repository.EmployeeRepository;
import com.gilbert.hr_platform.repository.LeaveRequestRepository;
import com.gilbert.hr_platform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;
    private final EmployeeRepository employeeRepository;
    private final LeaveRequestRepository leaveRepository;

    // =========================
    // ALL USERS
    // =========================
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // =========================
    // ALL EMPLOYEES
    // =========================
    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // =========================
    // ALL LEAVE REQUESTS
    // =========================
    @GetMapping("/leaves")
    public List<LeaveRequest> getAllLeaves() {
        return leaveRepository.findAll();
    }

    // =========================
    // PENDING LEAVES ONLY
    // =========================
    @GetMapping("/leaves/pending")
    public List<LeaveRequest> getPendingLeaves() {
        return leaveRepository.findByStatus(
                LeaveRequest.ApprovalStatus.PENDING
        );
    }
}