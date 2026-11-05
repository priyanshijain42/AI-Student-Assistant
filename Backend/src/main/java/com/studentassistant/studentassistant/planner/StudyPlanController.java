
package com.studentassistant.studentassistant.planner;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/study-plans")
@CrossOrigin(origins = {
    "http://127.0.0.1:5500",
    "http://localhost:5500"
})
public class StudyPlanController {

    private final StudyPlanService studyPlanService;

    public StudyPlanController(StudyPlanService studyPlanService) {
        this.studyPlanService = studyPlanService;
    }

    @PostMapping("/save")
    public StudyPlan savePlan(@RequestBody StudyPlan plan) {
        return studyPlanService.savePlan(plan);
    }

    @GetMapping("/{email}")
    public List<StudyPlan> getPlans(@PathVariable String email) {
        return studyPlanService.getPlans(email);
    }

    @DeleteMapping("/delete/{id}")
    public String deletePlan(@PathVariable Long id) {
        studyPlanService.deletePlan(id);
        return "Study plan deleted successfully!";
    }
}
