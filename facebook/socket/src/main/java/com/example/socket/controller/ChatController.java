package com.example.socket.controller;

import com.example.socket.service.WebSocketService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.*;

@Controller
@RequiredArgsConstructor
public class ChatController {
    private final WebSocketService webSocketService;
    @MessageMapping("/sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(
            @Payload ChatMessage chatMessage
    ) {
        return chatMessage;
    }

  @MessageMapping("/addUser")
  @SendTo("/topic/public")
  public List<Integer> addUser(
    @Payload UserMessage userMessage,
    SimpMessageHeaderAccessor headerAccessor
  ) {
    // Add username in web socket session
    webSocketService.addConnectedUser(userMessage.getOwner());
    headerAccessor.getSessionAttributes().put("username", userMessage.getOwner());
    return webSocketService.getConnectedUsers().stream().toList();
  }
}