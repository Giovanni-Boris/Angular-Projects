package com.realtime.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.realtime.backend.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Following {

  @Id
  @GeneratedValue(strategy= GenerationType.AUTO)
  @JsonIgnore
  private Integer id;
  private Integer userId;
  @JsonIgnore
  private Boolean deleted;
  @ManyToOne
  @JoinColumn(name="to_user_fk")
  @JsonBackReference
  private User from;

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Following otherUser = (Following) o;
    return this.getUserId().equals(otherUser.getUserId()) && this.getFrom().getId().equals(otherUser.getFrom().getId());
  }
}