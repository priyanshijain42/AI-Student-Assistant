
package com.studentassistant.studentassistant.planner;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StudyPlanService {

    private final StudyPlanRepository repository;

    public StudyPlanService(StudyPlanRepository repository) {
        this.repository = repository;
    }

    public StudyPlan savePlan(StudyPlan plan) {
        return repository.save(plan);
    }

    public List<StudyPlan> getPlans(String email) {
        return repository.findByStudentEmailOrderByCreatedAtDesc(email);
    }

    public void deletePlan(Long id) {
        repository.deleteById(id);
    }
}
