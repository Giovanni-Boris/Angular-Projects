package com.realtime.backend.controller.post;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostRequest {
  private String description;
  private String img;
  private Integer userId;
}
