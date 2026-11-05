package com.studentassistant.studentassistant.planner;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/planner")
@CrossOrigin(origins = {
    "http://127.0.0.1:5500",
    "http://localhost:5500"
})
public class AIStudyPlanController {

    private final AIStudyPlanService aiService;

    public AIStudyPlanController(AIStudyPlanService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/generate")
    public Map<String, String> generatePlan(
            @RequestBody StudyPlanRequest request) {

        String plan = aiService.generateStudyPlan(request);

        return Map.of("studyPlan", plan);
    }
}