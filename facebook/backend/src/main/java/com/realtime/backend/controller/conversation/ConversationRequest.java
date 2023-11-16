package com.realtime.backend.controller.conversation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class ConversationRequest {
  private Integer senderId;
  private Integer receiverId;

}
