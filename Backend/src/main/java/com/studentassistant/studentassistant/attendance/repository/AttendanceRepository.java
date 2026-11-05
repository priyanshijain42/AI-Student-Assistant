package com.studentassistant.studentassistant.attendance.repository;

import com.studentassistant.studentassistant.attendance.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    List<Attendance> findByStudentEmail(String studentEmail);

    boolean existsByStudentEmailAndAttendanceDate(
            String studentEmail,
            java.time.LocalDate attendanceDate
    );
}