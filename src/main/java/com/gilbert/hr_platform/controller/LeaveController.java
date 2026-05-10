package com.gilbert.hr_platform.controller;

import com.gilbert.hr_platform.entity.LeaveRequest;
import com.gilbert.hr_platform.repository.LeaveRequestRepository;
import com.gilbert.hr_platform.service.LeaveRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/leave")
@RequiredArgsConstructor
public class LeaveController {

    private final LeaveRequestRepository leaveRequestRepository;
    private final LeaveRequestService leaveRequestService;

    @GetMapping
    public List<LeaveRequest> getAll() {
        return leaveRequestRepository.findAll();
    }

    @PostMapping
    public LeaveRequest create(@RequestBody LeaveRequest request) {
        return leaveRequestRepository.save(request);
    }

    @PutMapping("/approve/{id}")
    public LeaveRequest approve(@PathVariable Long id) {
        return leaveRequestService.approveLeave(id);
    }

    @PutMapping("/reject/{id}")
    public LeaveRequest reject(@PathVariable Long id) {
        return leaveRequestService.rejectLeave(id);
    }
}