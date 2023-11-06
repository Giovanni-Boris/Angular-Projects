package com.realtime.backend.controller.auth;

import com.realtime.backend.model.Follower;
import com.realtime.backend.model.Following;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
  private String token;
  private Integer id;
}
