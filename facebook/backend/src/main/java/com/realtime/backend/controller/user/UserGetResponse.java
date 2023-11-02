package com.realtime.backend.controller.user;

import com.realtime.backend.model.Follower;
import com.realtime.backend.model.Post;
import com.realtime.backend.model.Following;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

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
  private List<Follower> followers;
  private List<Following> followings;
  private List<Post> posts;
}