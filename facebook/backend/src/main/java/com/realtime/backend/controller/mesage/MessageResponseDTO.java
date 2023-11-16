package com.realtime.backend.controller.mesage;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class MessageResponseDTO {
  private Integer id;
  private String text;
  private Timestamp creationdate;
  private Integer owner;
}
