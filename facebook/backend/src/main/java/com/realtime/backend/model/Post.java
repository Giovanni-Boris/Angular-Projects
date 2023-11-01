package com.realtime.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Post {
  @Id
  @GeneratedValue
  private Integer id;
  private String description;
  private String img;
  private Integer likes;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;
}
