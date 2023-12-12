package com.example.socket.config;


import com.example.socket.service.WebSocketService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@Slf4j
@RequiredArgsConstructor
public class WebSocketEventListener {

  private final SimpMessageSendingOperations messagingTemplate;
  private final WebSocketService webSocketService;
  @EventListener
  public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
    StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
    Integer username = (Integer) headerAccessor.getSessionAttributes().get("username");
    if (username != null) {
      log.info("user disconnected: {}", username);
      webSocketService.removeConnectedUser(username);

      messagingTemplate.convertAndSend("/topic/public", webSocketService.getConnectedUsers().stream().toList());
    }
  }

}