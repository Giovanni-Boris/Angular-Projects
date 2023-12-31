package com.realtime.backend.controller.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
  private Integer userId;
  private String name;
  private String email;
  private String password;
  private String profilePicture;
  private String coverPicture;
  private String description;
  private String country;
  private Integer relationship;
}
