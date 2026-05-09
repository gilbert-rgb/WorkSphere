package com.gilbert.hr_platform.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Employee employee;

    private LocalDate startDate;
    private LocalDate endDate;

    private String reason;

    @Enumerated(EnumType.STRING)
    private ApprovalStatus status;

    public enum ApprovalStatus {
        PENDING,
        APPROVED,
        REJECTED
    }

    @PrePersist
    public void init() {
        if (status == null) {
            status = ApprovalStatus.PENDING;
        }
    }
}