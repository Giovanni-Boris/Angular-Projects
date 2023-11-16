package com.realtime.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Conversation {
  @Id
  @GeneratedValue
  private Integer id;

  @ManyToMany(mappedBy = "conversations", fetch = FetchType.LAZY)
  private List<User> users;

  @OneToMany(mappedBy = "conversation", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
  private List<Message> messages;

  @CreationTimestamp
  private Date creationdate;
  @UpdateTimestamp
  private Date updatedate;
}
