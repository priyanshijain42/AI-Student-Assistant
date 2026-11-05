
package com.studentassistant.studentassistant.chatbot;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.Map;

@Service
public class ChatbotService {

    private final RestTemplate restTemplate = new RestTemplate();

    public String getAIResponse(String question) {

        String url = "http://localhost:11434/api/generate";

        Map<String, Object> options = Map.of(
            "num_predict", 800,
            "temperature", 0.5
        );

        Map<String, Object> request = Map.of(
            "model", "llama3.2:1b",
            "prompt", question,
            "stream", false,
            "options", options
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(request, headers);

        ResponseEntity<Map<String, Object>> response =
                restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    new org.springframework.core.ParameterizedTypeReference<Map<String, Object>>() {}
                );

        Map<String, Object> responseBody = response.getBody();

        if (responseBody == null || responseBody.get("response") == null) {
            return "Sorry, I could not generate an answer.";
        }

        return responseBody.get("response").toString();
    }
}
