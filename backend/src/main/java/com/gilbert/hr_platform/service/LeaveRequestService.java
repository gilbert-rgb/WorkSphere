package com.gilbert.hr_platform.service;

import com.gilbert.hr_platform.entity.Employee;
import com.gilbert.hr_platform.entity.LeaveRequest;
import com.gilbert.hr_platform.repository.LeaveRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LeaveRequestService {

    private final LeaveRequestRepository leaveRequestRepository;

    // =========================
    // APPLY LEAVE
    // =========================
    public LeaveRequest applyLeave(Employee emp,
                                   LocalDate startDate,
                                   LocalDate endDate,
                                   String reason) {

        validateDates(startDate, endDate);

        if (leaveRequestRepository.existsOverlappingLeave(
                emp.getId(),
                startDate,
                endDate
        )) {
            throw new IllegalStateException("Overlapping leave exists");
        }

        LeaveRequest leave = LeaveRequest.builder()
                .employee(emp)
                .startDate(startDate)
                .endDate(endDate)
                .reason(reason)
                .status(LeaveRequest.ApprovalStatus.PENDING)
                .build();

        return leaveRequestRepository.save(leave);
    }

    // =========================
    // GET EMPLOYEE LEAVES
    // =========================
    public List<LeaveRequest> getEmployeeLeaves(Long employeeId) {
        return leaveRequestRepository.findByEmployeeId(employeeId);
    }

    // =========================
    // APPROVE LEAVE
    // =========================
    @Transactional
    public LeaveRequest approveLeave(Long leaveId) {
        LeaveRequest leave = getLeaveById(leaveId);
        leave.setStatus(LeaveRequest.ApprovalStatus.APPROVED);
        return leave;
    }

    // =========================
    // REJECT LEAVE
    // =========================
    @Transactional
    public LeaveRequest rejectLeave(Long leaveId) {
        LeaveRequest leave = getLeaveById(leaveId);
        leave.setStatus(LeaveRequest.ApprovalStatus.REJECTED);
        return leave;
    }

    // =========================
    // GET LEAVE
    // =========================
    public LeaveRequest getLeaveById(Long id) {
        return leaveRequestRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Leave not found"));
    }

    // =========================
    // VALIDATION
    // =========================
    private void validateDates(LocalDate start, LocalDate end) {

        if (start.isAfter(end)) {
            throw new IllegalArgumentException("Start date cannot be after end date");
        }

        if (start.isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Cannot apply leave in past");
        }
    }
}