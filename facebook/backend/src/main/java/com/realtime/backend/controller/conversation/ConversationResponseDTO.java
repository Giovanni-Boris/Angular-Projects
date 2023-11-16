package com.realtime.backend.controller.conversation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ConversationResponseDTO {
  private Integer id;
  private int[] members;
}
