
package com.studentassistant.studentassistant.attendance.controller;

import com.studentassistant.studentassistant.attendance.Attendance;
import com.studentassistant.studentassistant.attendance.service.AttendanceService;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500"})
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @PostMapping("/mark")
    public Attendance markAttendance(
            @RequestParam String email,
            @RequestParam String status) {

        return attendanceService.markAttendance(email, status);
    }

    @GetMapping("/view")
    public List<Attendance> viewAttendance(@RequestParam String email) {

        return attendanceService.getAttendance(email);
    }

    @GetMapping("/summary")
    public Map<String, Object> attendanceSummary(
            @RequestParam String email) {

        return attendanceService.getAttendanceSummary(email);
    }
}
