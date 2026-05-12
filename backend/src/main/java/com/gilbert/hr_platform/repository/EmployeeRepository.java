package com.gilbert.hr_platform.repository;

import com.gilbert.hr_platform.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByWhatsappNumber(String whatsappNumber);

    Optional<Employee> findByUserId(Long id);
    Optional<Employee> findByUserUsername(String username);
}