package com.realtime.backend.controller.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class UserGetResponse {
  private Integer userId;
  private String name;
  private String email;
  private String profilePicture;
  private String coverPicture;
  private String description;
  private String country;
  private Integer relationship;
}