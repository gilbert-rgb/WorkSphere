package com.gilbert.hr_platform.repository;

import com.gilbert.hr_platform.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // Used to look up the employee when a WhatsApp message is received
    Optional<Employee> findByWhatsappNumber(String whatsappNumber);
}
