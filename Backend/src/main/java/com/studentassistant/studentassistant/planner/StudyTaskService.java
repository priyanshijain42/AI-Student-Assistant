
package com.studentassistant.studentassistant.planner;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StudyTaskService {

    private final StudyTaskRepository repository;

    public StudyTaskService(StudyTaskRepository repository) {
        this.repository = repository;
    }

    public StudyTask addTask(StudyTask task) {
        return repository.save(task);
    }

    public List<StudyTask> getTasks(String email) {
        return repository.findByStudentEmailOrderByStudyDateAsc(email);
    }

    public StudyTask updateTask(Long id, boolean completed) {

        StudyTask task = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setCompleted(completed);

        return repository.save(task);
    }

    public void deleteTask(Long id) {
        repository.deleteById(id);
    }
}
