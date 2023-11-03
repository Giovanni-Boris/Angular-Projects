package com.realtime.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Post {
  @Id
  @GeneratedValue
  private Integer id;
  private String description;
  private String img;
  @OneToMany(mappedBy = "user_like", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
  @JsonManagedReference
  private List<PostUserId> likes;
  @ManyToOne
  @JoinColumn(name = "user_id")
  @JsonBackReference
  private User user;
  @CreationTimestamp
  private Date regdate;
  @UpdateTimestamp
  private Date updatedate;
}
