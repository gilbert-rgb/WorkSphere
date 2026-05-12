package com.gilbert.hr_platform.whatsapp;

import com.gilbert.hr_platform.entity.Attendance;
import com.gilbert.hr_platform.entity.Employee;
import com.gilbert.hr_platform.entity.LeaveRequest;
import com.gilbert.hr_platform.entity.Payroll;
import com.gilbert.hr_platform.repository.AttendanceRepository;
import com.gilbert.hr_platform.repository.EmployeeRepository;
import com.gilbert.hr_platform.repository.LeaveRequestRepository;
import com.gilbert.hr_platform.repository.PayrollRepository;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@Slf4j
@RequiredArgsConstructor
public class WhatsappService {

    private final WhatsAppCommandParser parser;
    private final EmployeeRepository employeeRepository;
    private final AttendanceRepository attendanceRepository;
    private final LeaveRequestRepository leaveRequestRepository;
    private final PayrollRepository payrollRepository;

    @Value("${twilio.account-sid}")
    private String accountSid;

    @Value("${twilio.auth-token}")
    private String authToken;

    @Value("${twilio.whatsapp-from}")
    private String from;

    @PostConstruct
    public void init() {
        Twilio.init(accountSid, authToken);
        log.info("Twilio initialized with number: {}", from);
    }

    public void processIncomingMessage(String fromNumber, String body) {
        log.info("📩 Incoming from: {} => {}", fromNumber, body);

        String cleanNumber = fromNumber.replace("whatsapp:", "");
        String whatsappNumber = cleanNumber.startsWith("+") ? cleanNumber : "+" + cleanNumber;

        Optional<Employee> empOpt = employeeRepository.findByWhatsappNumber(whatsappNumber);
        if (empOpt.isEmpty()) {
            sendMessage(cleanNumber, "❌ Your number is not registered in the system. Please contact HR.");
            return;
        }

        Employee employee = empOpt.get();
        String intent = parser.parse(body);
        log.info("🎯 Intent: {} for employee: {}", intent, employee.getFirstName());

        String reply = switch (intent) {
            case "GREETING" -> """
                    👋 Hi %s! I'm your HR Assistant.
                    Here's what I can do:
                    • *check in* - Record arrival
                    • *check out* - Record departure
                    • *leave YYYY-MM-DD YYYY-MM-DD reason* - Request leave
                    • *leave balance* - Check remaining days
                    • *payslip* - View latest payslip
                    """.formatted(employee.getFirstName());

            case "ATTENDANCE_CHECK_IN"  -> handleCheckIn(employee);
            case "ATTENDANCE_CHECK_OUT" -> handleCheckOut(employee);
            case "LEAVE_REQUEST"        -> handleLeaveRequest(employee, body);
            case "LEAVE_BALANCE"        -> handleLeaveBalance(employee);
            case "PAYROLL_QUERY"        -> handlePayslip(employee);

            default -> "🤖 I didn't understand that. Type *help* to see available commands.";
        };

        sendMessage(cleanNumber, reply);
    }

    // =========================
    // CHECK IN
    // =========================
    private String handleCheckIn(Employee employee) {
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        LocalDateTime endOfDay = LocalDate.now().atTime(LocalTime.MAX);

        List<Attendance> todayRecords = attendanceRepository.findAll().stream()
                .filter(a -> a.getEmployee().getId().equals(employee.getId()))
                .filter(a -> a.getCheckIn() != null
                        && a.getCheckIn().isAfter(startOfDay)
                        && a.getCheckIn().isBefore(endOfDay))
                .toList();

        if (!todayRecords.isEmpty()) {
            return "⚠️ You already checked in today at "
                    + todayRecords.get(0).getCheckIn().toLocalTime().withNano(0);
        }

        Attendance attendance = Attendance.builder()
                .employee(employee)
                .checkIn(LocalDateTime.now())
                .status("PRESENT")
                .build();
        attendanceRepository.save(attendance);

        return "☀️ Check-in Successful\nTime: " + LocalTime.now().withNano(0)
                + "\nHave a productive day, " + employee.getFirstName() + "!";
    }

    // =========================
    // CHECK OUT
    // =========================
    private String handleCheckOut(Employee employee) {
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();

        Optional<Attendance> record = attendanceRepository.findAll().stream()
                .filter(a -> a.getEmployee().getId().equals(employee.getId()))
                .filter(a -> a.getCheckIn() != null && a.getCheckIn().isAfter(startOfDay))
                .filter(a -> a.getCheckOut() == null)
                .findFirst();

        if (record.isEmpty()) {
            return "⚠️ No active check-in found for today. Please check in first.";
        }

        Attendance att = record.get();
        att.setCheckOut(LocalDateTime.now());
        attendanceRepository.save(att);

        return "🌙 Check-out Successful\nTime: " + LocalTime.now().withNano(0)
                + "\nHave a great evening, " + employee.getFirstName() + "!";
    }

    // =========================
    // LEAVE REQUEST
    // =========================
    private String handleLeaveRequest(Employee employee, String body) {
        Pattern pattern = Pattern.compile(
                "leave\\s+(\\d{4}-\\d{2}-\\d{2})\\s+(\\d{4}-\\d{2}-\\d{2})\\s*(.*)",
                Pattern.CASE_INSENSITIVE
        );
        Matcher matcher = pattern.matcher(body.trim());

        if (!matcher.find()) {
            return """
                    📅 To request leave, use this format:
                    *leave YYYY-MM-DD YYYY-MM-DD reason*
                    Example: leave 2026-05-20 2026-05-25 Sick leave
                    """;
        }

        try {
            LocalDate startDate = LocalDate.parse(matcher.group(1));
            LocalDate endDate = LocalDate.parse(matcher.group(2));
            String reason = matcher.group(3).isBlank() ? "Not specified" : matcher.group(3);

            if (endDate.isBefore(startDate)) {
                return "❌ End date cannot be before start date.";
            }

            boolean overlap = leaveRequestRepository.existsOverlappingLeave(
                    employee.getId(), startDate, endDate);
            if (overlap) {
                return "⚠️ You already have a leave request overlapping those dates.";
            }

            LeaveRequest leave = LeaveRequest.builder()
                    .employee(employee)
                    .startDate(startDate)
                    .endDate(endDate)
                    .reason(reason)
                    .status(LeaveRequest.ApprovalStatus.PENDING)
                    .build();
            leaveRequestRepository.save(leave);

            return "✅ Leave Request Submitted!\n"
                    + "📅 From: " + startDate + "\n"
                    + "📅 To: " + endDate + "\n"
                    + "📝 Reason: " + reason + "\n"
                    + "⏳ Status: Pending manager approval";

        } catch (DateTimeParseException e) {
            return "❌ Invalid date format. Use YYYY-MM-DD e.g. 2026-05-20";
        }
    }

    // =========================
    // LEAVE BALANCE
    // =========================
    private String handleLeaveBalance(Employee employee) {
        List<LeaveRequest> approved = leaveRequestRepository
                .findByEmployeeId(employee.getId())
                .stream()
                .filter(l -> l.getStatus() == LeaveRequest.ApprovalStatus.APPROVED)
                .toList();

        int usedDays = approved.stream()
                .mapToInt(l -> (int) (l.getEndDate().toEpochDay()
                        - l.getStartDate().toEpochDay() + 1))
                .sum();

        int totalDays = 21;
        int remaining = Math.max(0, totalDays - usedDays);

        return "📊 Leave Balance for " + employee.getFirstName() + "\n"
                + "Total: " + totalDays + " days\n"
                + "Used: " + usedDays + " days\n"
                + "Remaining: " + remaining + " days";
    }

    // =========================
    // PAYSLIP
    // =========================
    private String handlePayslip(Employee employee) {
        List<Payroll> payrolls = payrollRepository.findByEmployeeId(employee.getId());

        if (payrolls.isEmpty()) {
            return "💰 No payslip found. Please contact HR.";
        }

        Payroll latest = payrolls.stream()
                .max((a, b) -> a.getMonth().compareTo(b.getMonth()))
                .get();

        return "💰 Latest Payslip - "
                + latest.getMonth().getMonth() + " " + latest.getMonth().getYear() + "\n"
                + "Basic Salary: " + latest.getBasicSalary() + "\n"
                + "Bonus:        " + latest.getBonus() + "\n"
                + "Deductions:   " + latest.getDeductions() + "\n"
                + "━━━━━━━━━━━━━━━\n"
                + "Net Salary:  *" + latest.getNetSalary() + "*";
    }

    // =========================
    // SEND MESSAGE
    // =========================
    public boolean sendMessage(String to, String messageBody) {
        try {
            String formattedTo = to.startsWith("whatsapp:") ? to : "whatsapp:" + to;
            Message.creator(
                    new PhoneNumber(formattedTo),
                    new PhoneNumber(from),
                    messageBody
            ).create();
            log.info("✅ Message sent to: {}", formattedTo);
            return true;
        } catch (Exception e) {
            log.error("❌ Error sending WhatsApp message to {}: {}", to, e.getMessage());
            return false;
        }
    }
}