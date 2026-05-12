package com.gilbert.hr_platform.controller;

import com.gilbert.hr_platform.entity.Employee;
import com.gilbert.hr_platform.entity.Payroll;
import com.gilbert.hr_platform.repository.EmployeeRepository;
import com.gilbert.hr_platform.service.PayrollService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/payroll")
@RequiredArgsConstructor
public class PayrollController {

    private final PayrollService payrollService;
    private final EmployeeRepository employeeRepository;

    // ADMIN/HR — generate payroll for an employee
    @PostMapping("/generate/{employeeId}")
    public ResponseEntity<Payroll> generatePayroll(
            @PathVariable Long employeeId,
            @RequestBody Map<String, BigDecimal> body) {

        Employee emp = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        BigDecimal bonus = body.getOrDefault("bonus", BigDecimal.ZERO);
        BigDecimal deductions = body.getOrDefault("deductions", BigDecimal.ZERO);

        return ResponseEntity.ok(payrollService.generatePayroll(emp, bonus, deductions));
    }

    // ADMIN/HR — get all payroll for a specific employee
    @GetMapping("/{employeeId}")
    public ResponseEntity<List<Payroll>> getEmployeePayroll(@PathVariable Long employeeId) {
        return ResponseEntity.ok(payrollService.getEmployeePayroll(employeeId));
    }

    // ADMIN/HR — get all payroll records
    @GetMapping
    public ResponseEntity<List<Payroll>> getAllPayroll() {
        return ResponseEntity.ok(payrollService.getAllPayroll());
    }

    // EMPLOYEE — get own payroll
    @GetMapping("/me")
    public ResponseEntity<List<Payroll>> getMyPayroll(Authentication authentication) {
        String username = authentication.getName();
        Employee emp = employeeRepository.findByUserUsername(username)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        return ResponseEntity.ok(payrollService.getEmployeePayroll(emp.getId()));
    }
}