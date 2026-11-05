
package com.studentassistant.studentassistant.planner;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/planner")
@CrossOrigin(origins = {
    "http://127.0.0.1:5500",
    "http://localhost:5500"
})
public class StudyTaskController {

    private final StudyTaskService service;

    public StudyTaskController(StudyTaskService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public StudyTask addTask(@RequestBody StudyTask task) {
        return service.addTask(task);
    }

    @GetMapping("/{email}")
    public List<StudyTask> getTasks(@PathVariable String email) {
        return service.getTasks(email);
    }

    @PutMapping("/complete/{id}")
    public StudyTask completeTask(
            @PathVariable Long id,
            @RequestParam boolean completed) {
        return service.updateTask(id, completed);
    }

    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id) {
        service.deleteTask(id);
        return "Task deleted successfully!";
    }
}
