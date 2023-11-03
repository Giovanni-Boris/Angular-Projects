package com.realtime.backend.controller.post;

import com.realtime.backend.model.PostLike;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostResponse {
  private String description;
  private String img;
  private List<PostLike> likes;
  private Integer userId;

}
