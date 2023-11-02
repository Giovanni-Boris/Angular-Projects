package com.realtime.backend.controller.auth;

import com.realtime.backend.model.Post;
import com.realtime.backend.model.User;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
  private String token;
  private Integer id;
  private String name;
  private String email;
  private String profilePicture;
  private String coverPicture;
  private String description;
  private String country;
  private Integer relationship;
  private Set<User> followers;
  private Set<User> followings;
}
