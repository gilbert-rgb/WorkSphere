package com.gilbert.hr_platform.service;

import com.gilbert.hr_platform.entity.Department;
import com.gilbert.hr_platform.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentService {

    private final DepartmentRepository repo;

    public Department create(String name) {
        return repo.save(Department.builder().name(name).build());
    }

    public List<Department> getAll() {
        return repo.findAll();
    }
}