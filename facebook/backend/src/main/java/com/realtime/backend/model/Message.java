package com.realtime.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Message {
  @Id
  @GeneratedValue
  private Integer id;
  private String msg;
  private Integer owner;
  @ManyToOne
  @JoinColumn(name = "conversation_id")
  private Conversation message;
}
