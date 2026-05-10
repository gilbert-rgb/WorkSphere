package com.gilbert.hr_platform.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payroll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Employee employee;

    private BigDecimal basicSalary;
    private BigDecimal bonus;
    private BigDecimal deductions;
    private BigDecimal netSalary;

    private LocalDate month;
}