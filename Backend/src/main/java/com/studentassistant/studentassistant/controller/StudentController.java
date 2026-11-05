package com.studentassistant.studentassistant.controller;

import com.studentassistant.studentassistant.dto.LoginRequest;
import com.studentassistant.studentassistant.entity.Student;
import com.studentassistant.studentassistant.service.StudentService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public String studentHome() {
        return "Welcome to Student Dashboard!";
    }

    @PostMapping("/register")
    public String registerStudent(@RequestBody Student student) {
        studentService.registerStudent(student);
        return "Student registered successfully!";
    }

    @PostMapping("/login")
    public String loginStudent(@RequestBody LoginRequest request) {

        boolean success = studentService.loginStudent(
                request.getEmail(),
                request.getPassword()
        );

        if (success) {
            return "Login successful! Welcome to AI Student Assistant.";
        }

        return "Invalid email or password!";
    }
    @GetMapping("/profile")
public Student getStudentProfile(@RequestParam String email) {

    Student student = studentService.getStudentByEmail(email);

    if (student == null) {
        throw new RuntimeException("Student not found!");
    }

    student.setPassword(null);

    return student;
}
@GetMapping("/dashboard")
public String studentDashboard(@RequestParam String email) {

    Student student = studentService.getStudentByEmail(email);

    if (student == null) {
        return "Student not found!";
    }

    return "Welcome " + student.getName()
            + "! Welcome to your AI Student Assistant Dashboard.";
}
}