package com.realtime.backend.service;

import com.realtime.backend.config.JwtService;
import com.realtime.backend.controller.auth.AuthenticationRequest;
import com.realtime.backend.controller.auth.AuthenticationResponse;
import com.realtime.backend.controller.auth.RegisterRequest;
import com.realtime.backend.enums.Role;
import com.realtime.backend.model.User;
import com.realtime.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private final UserRepository repository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
  public AuthenticationResponse register(RegisterRequest request){
    var user = User.builder()
      .name(request.getName())
      .email(request.getEmail())
      .followings(new ArrayList<>())
      .followers( new ArrayList<>())
      .posts(new ArrayList<>())
      .description("")
      .coverPicture("")
      .profilePicture("")
      .relationship(1)
      .country("")
      .password(passwordEncoder.encode(request.getPassword()))
      .role(Role.USER)
      .build();
    repository.save(user);
    var jwtToken = jwtService.generateToken(user);
    return this.responseBuilder(user,jwtToken);
  }
  public AuthenticationResponse authenticate(AuthenticationRequest request){
    authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(
        request.getEmail(),
        request.getPassword()
      )
    );
    var user = repository.findByEmail(request.getEmail())
      .orElseThrow();
    var jwtToken = jwtService.generateToken(user);
    return this.responseBuilder(user,jwtToken);
  }
  private AuthenticationResponse responseBuilder(User user, String token){
    return AuthenticationResponse.builder()
      .token(token)
      .id(user.getId())
      .email(user.getEmail())
      .name(user.getName())
      .profilePicture(user.getProfilePicture())
      .coverPicture(user.getCoverPicture())
      .description(user.getDescription())
      .country(user.getCountry())
      .relationship(user.getRelationship())
      .followers(user.getFollowers())
      .followings(user.getFollowings())
      .build();
  }
}
