package com.realtime.backend.controller.mesage;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class MessageRequest {
  private String text;
  private Integer owner;
  private Integer conversationId;
}
