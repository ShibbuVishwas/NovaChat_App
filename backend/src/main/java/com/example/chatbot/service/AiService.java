package com.example.chatbot.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import com.example.chatbot.dto.ChatResponse;

@Service
public class AiService {

    @Value("${groq.api.url}")
    private String groqUrl;

    @Value("${groq.api.key}")
    private String apiKey;

    @Value("${groq.api.model}")
    private String model;

    private final RestTemplate restTemplate = new RestTemplate();

    public ChatResponse generateResponse(String prompt) {

        Map<String, Object> requestBody = Map.of(
                "model", model,
                "messages", List.of(
                        Map.of(
                                "role", "user",
                                "content", prompt
                        )
                )
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            Map<String, Object> response
                    = restTemplate.postForObject(groqUrl, entity, Map.class);

            List<Map<String, Object>> choices
                    = (List<Map<String, Object>>) response.get("choices");

            Map<String, Object> message
                    = (Map<String, Object>) choices.get(0).get("message");

            String text = (String) message.get("content");

            return new ChatResponse(text);

        } catch (HttpClientErrorException e) {

            if (e.getStatusCode() == HttpStatus.TOO_MANY_REQUESTS) {
                return new ChatResponse("⚠️ Groq rate limit reached. Please try again in a few seconds.");
            }

            return new ChatResponse("Client Error: " + e.getMessage());

        } catch (HttpServerErrorException e) {

            if (e.getStatusCode().value() == 503) {
                return new ChatResponse("⚠️ Groq servers are overloaded. Please try again in a few seconds.");
            }

            return new ChatResponse("Server Error: " + e.getMessage());

        } catch (Exception e) {
            return new ChatResponse("Error reading response: " + e.getMessage());
        }
    }
}
