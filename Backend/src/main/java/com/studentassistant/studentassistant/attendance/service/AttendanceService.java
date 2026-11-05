package com.studentassistant.studentassistant.attendance.service;

import com.studentassistant.studentassistant.attendance.Attendance;
import com.studentassistant.studentassistant.attendance.repository.AttendanceRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;

    public AttendanceService(AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    public Attendance markAttendance(String email, String status) {

        if (!status.equalsIgnoreCase("PRESENT")
                && !status.equalsIgnoreCase("ABSENT")) {
            throw new RuntimeException("Status must be PRESENT or ABSENT");
        }

        LocalDate today = LocalDate.now();

        if (attendanceRepository.existsByStudentEmailAndAttendanceDate(email, today)) {
            throw new RuntimeException("Attendance already marked for today!");
        }

        Attendance attendance = new Attendance();
        attendance.setStudentEmail(email);
        attendance.setAttendanceDate(today);
        attendance.setStatus(status.toUpperCase());

        return attendanceRepository.save(attendance);
    }

    public List<Attendance> getAttendance(String email) {
        return attendanceRepository.findByStudentEmail(email);
    }
    public java.util.Map<String, Object> getAttendanceSummary(String email) {

    java.util.List<Attendance> records =
            attendanceRepository.findByStudentEmail(email);

    long totalClasses = records.size();

    long presentClasses = records.stream()
            .filter(a -> "PRESENT".equalsIgnoreCase(a.getStatus()))
            .count();

    long absentClasses = records.stream()
            .filter(a -> "ABSENT".equalsIgnoreCase(a.getStatus()))
            .count();

    double percentage = totalClasses == 0
            ? 0
            : (presentClasses * 100.0) / totalClasses;

    java.util.Map<String, Object> summary = new java.util.HashMap<>();

    summary.put("studentEmail", email);
    summary.put("totalClasses", totalClasses);
    summary.put("presentClasses", presentClasses);
    summary.put("absentClasses", absentClasses);
    summary.put("attendancePercentage", percentage);

    return summary;
}
}