package com.realtime.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class PostUserId {
  @Id
  @GeneratedValue(strategy= GenerationType.AUTO)
  @JsonIgnore
  private Integer id;
  private Integer userId;
  @ManyToOne
  @JoinColumn(name="post_id")
  @JsonBackReference
  private Post user_like;

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Follower otherUser = (Follower) o;
    return this.userId.equals(otherUser.getUserId());
  }
}
