package com.realtime.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Message {
  @Id
  @GeneratedValue
  private Integer id;
  private String text;
  private Integer owner;
  @ManyToOne
  @JoinColumn(name = "conversation_id")
  private Conversation conversation;
  @CreationTimestamp
  private Timestamp creationdate;
  @UpdateTimestamp
  private Timestamp updatedate;
}
