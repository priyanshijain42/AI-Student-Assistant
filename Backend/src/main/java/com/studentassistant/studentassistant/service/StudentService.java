package com.studentassistant.studentassistant.service;

import com.studentassistant.studentassistant.entity.Student;
import com.studentassistant.studentassistant.repository.StudentRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;

    public StudentService(StudentRepository studentRepository,
                          PasswordEncoder passwordEncoder) {
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Student registerStudent(Student student) {

        if (studentRepository.existsByEmail(student.getEmail())) {
            throw new RuntimeException("Email already registered!");
        }

        student.setPassword(passwordEncoder.encode(student.getPassword()));

        return studentRepository.save(student);
    }

    public boolean loginStudent(String email, String password) {

        return studentRepository.findByEmail(email)
                .map(student -> passwordEncoder.matches(
                        password, student.getPassword()))
                .orElse(false);
    }
    public Student getStudentByEmail(String email) {
    return studentRepository.findByEmail(email).orElse(null);
}
}