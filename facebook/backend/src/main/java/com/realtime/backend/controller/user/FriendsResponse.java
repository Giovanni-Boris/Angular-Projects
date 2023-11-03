package com.realtime.backend.controller.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class FriendsResponse {
  private Integer _id;
  private String name;
  private String profilePicture;

}
