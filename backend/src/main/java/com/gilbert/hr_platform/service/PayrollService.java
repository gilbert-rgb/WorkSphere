package com.gilbert.hr_platform.service;

import com.gilbert.hr_platform.entity.Employee;
import com.gilbert.hr_platform.entity.Payroll;
import com.gilbert.hr_platform.repository.PayrollRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PayrollService {

    private final PayrollRepository repo;

    public Payroll generatePayroll(Employee emp,
                                   BigDecimal bonus,
                                   BigDecimal deductions) {

        BigDecimal net = emp.getSalary()
                .add(bonus)
                .subtract(deductions);

        Payroll payroll = Payroll.builder()
                .employee(emp)
                .basicSalary(emp.getSalary())
                .bonus(bonus)
                .deductions(deductions)
                .netSalary(net)
                .month(LocalDate.now())
                .build();

        return repo.save(payroll);
    }

    public List<Payroll> getEmployeePayroll(Long empId) {
        return repo.findByEmployeeId(empId);
    }
}