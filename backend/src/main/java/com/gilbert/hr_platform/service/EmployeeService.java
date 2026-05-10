package com.gilbert.hr_platform.service;

import com.gilbert.hr_platform.entity.Employee;
import com.gilbert.hr_platform.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository repo;

    public Employee create(Employee employee) {
        return repo.save(employee);
    }

    public List<Employee> getAll() {
        return repo.findAll();
    }

    public Employee getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    public Employee getByWhatsapp(String phone) {
        return repo.findByWhatsappNumber(phone)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }
}