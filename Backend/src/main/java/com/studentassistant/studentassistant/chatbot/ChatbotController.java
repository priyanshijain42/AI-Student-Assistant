
package com.studentassistant.studentassistant.chatbot;

import com.studentassistant.studentassistant.history.ChatHistoryService;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/chatbot")
@CrossOrigin(origins = {
    "http://127.0.0.1:5500",
    "http://localhost:5500"
})
public class ChatbotController {

    private final ChatbotService chatbotService;
    private final ChatHistoryService historyService;

    public ChatbotController(
            ChatbotService chatbotService,
            ChatHistoryService historyService) {
        this.chatbotService = chatbotService;
        this.historyService = historyService;
    }

    @PostMapping("/ask")
    public Map<String, String> askQuestion(
            @RequestBody Map<String, String> request) {

        String question = request.get("question");
        String email = request.get("email");

        if (question == null || question.trim().isEmpty()) {
            return Map.of("answer", "Please enter your question.");
        }

        String answer = chatbotService.getAIResponse(question);

        if (email != null && !email.trim().isEmpty()) {
            historyService.saveChat(email, question, answer);
        }

        return Map.of("answer", answer);
    }
}
