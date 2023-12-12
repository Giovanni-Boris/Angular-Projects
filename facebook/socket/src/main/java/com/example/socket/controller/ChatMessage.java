package com.example.socket.controller;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatMessage {
  private String text;
  private Integer owner;
  private Integer conversationId;
}
