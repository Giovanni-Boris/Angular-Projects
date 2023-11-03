package com.realtime.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Follower {

  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  @JsonIgnore
  private Integer id;
  private Integer userId;
  @ManyToOne
  @JoinColumn(name="from_user_fk")
  @JsonBackReference
  private User to;


  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Follower otherUser = (Follower) o;
    return this.getUserId().equals(otherUser.getUserId()) && this.getTo().getId().equals(otherUser.getTo().getId());
  }

}