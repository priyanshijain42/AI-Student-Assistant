
package com.studentassistant.studentassistant.planner;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StudyPlanRepository extends JpaRepository<StudyPlan, Long> {

    List<StudyPlan> findByStudentEmailOrderByCreatedAtDesc(String studentEmail);

}
