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
public class PostLike {
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
    PostLike otherUser = (PostLike) o;
    System.out.println(this.userId+"  userid  "+   this.getUser_like().getId() +"    post "+ this.getUser_like().getId() +"   "+ otherUser.getUser_like().getId());
    return this.userId.equals(otherUser.getUserId()) && this.getUser_like().getId().equals(otherUser.getUser_like().getId());
  }
}
