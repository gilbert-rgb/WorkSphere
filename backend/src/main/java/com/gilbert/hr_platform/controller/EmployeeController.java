package com.gilbert.hr_platform.controller;

import com.gilbert.hr_platform.entity.Employee;
import com.gilbert.hr_platform.entity.User;
import com.gilbert.hr_platform.repository.EmployeeRepository;
import com.gilbert.hr_platform.repository.UserRepository;
import com.gilbert.hr_platform.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeRepository employeeRepository;
    private final EmployeeService employeeService;
    private final UserRepository userRepository;  // ← add this

    @GetMapping
    public List<Employee> getAll() {
        return employeeRepository.findAll();
    }

    @PostMapping
    public Employee create(@RequestBody Employee employee) {
        // ← link the user before saving
        if (employee.getUser() != null && employee.getUser().getId() != null) {
            User user = userRepository.findById(employee.getUser().getId())
                    .orElseThrow(() -> new RuntimeException("User not found: " + employee.getUser().getId()));
            employee.setUser(user);
        }
        return employeeRepository.save(employee);
    }

    @PutMapping("/{id}")
    public Employee update(@PathVariable Long id, @RequestBody Employee employee) {
        employee.setId(id);
        return employeeRepository.save(employee);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        employeeRepository.deleteById(id);
    }
}