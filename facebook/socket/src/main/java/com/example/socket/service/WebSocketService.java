package com.example.socket.service;

import lombok.Getter;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Getter
@Service
public class WebSocketService {

  private final Set<Integer> connectedUsers;

  public WebSocketService(SimpMessagingTemplate messagingTemplate) {
    this.connectedUsers = new HashSet<>();
  }

  public void addConnectedUser(Integer userId) {
    connectedUsers.add(userId);
  }

  public void removeConnectedUser(Integer userId) {
    connectedUsers.remove(userId);
  }

}