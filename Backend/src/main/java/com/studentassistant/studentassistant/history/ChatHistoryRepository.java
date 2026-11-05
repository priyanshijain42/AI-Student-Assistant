
package com.studentassistant.studentassistant.history;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ChatHistoryRepository extends JpaRepository<ChatHistory, Long> {

    List<ChatHistory> findByStudentEmailOrderByCreatedAtDesc(String studentEmail);
}
