
package com.studentassistant.studentassistant.history;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ChatHistoryService {

    private final ChatHistoryRepository repository;

    public ChatHistoryService(ChatHistoryRepository repository) {
        this.repository = repository;
    }

    public ChatHistory saveChat(String email, String question, String answer) {

        ChatHistory history = new ChatHistory();

        history.setStudentEmail(email);
        history.setQuestion(question);
        history.setAnswer(answer);

        return repository.save(history);
    }

    public List<ChatHistory> getChatHistory(String email) {
        return repository.findByStudentEmailOrderByCreatedAtDesc(email);
    }
}
