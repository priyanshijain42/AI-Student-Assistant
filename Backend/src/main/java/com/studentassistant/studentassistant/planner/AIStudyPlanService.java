
package com.studentassistant.studentassistant.planner;

import org.springframework.stereotype.Service;
import com.studentassistant.studentassistant.chatbot.ChatbotService;

@Service
public class AIStudyPlanService {

    private final ChatbotService chatbotService;

    public AIStudyPlanService(ChatbotService chatbotService) {
        this.chatbotService = chatbotService;
    }

    public String generateStudyPlan(StudyPlanRequest request) {

        int days = request.getDays();
        int hours = request.getHoursPerDay();

        String prompt = "Create a SHORT and practical study timetable. "
                + "Subjects: " + request.getSubjects() + ". "

                + "STRICT RULES: "
                + "Generate EXACTLY " + days + " days. "
                + "Include Day 1 through Day " + days + " only. "
                + "Do not create weeks or extra days. "

                + "Each day must contain EXACTLY " + hours
                + " hours of actual study time. "
                + "Breaks and lunch are NOT study time. "
                + "Never schedule more than " + hours
                + " study hours in one day. "

                + "For each day, include only 2 or 3 study sessions. "
                + "Add a short break if needed. "
                + "Include a little revision. "

                + "Use simple language. "
                + "Keep each session description short. "
                + "Do not add long explanations or introductions. "
                + "Stop immediately after Day " + days + ".";

        return chatbotService.getAIResponse(prompt);
    }
}
