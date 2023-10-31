package com.realtime.backend.service;

import com.realtime.backend.controller.auth.AuthenticationRequest;
import com.realtime.backend.controller.auth.AuthenticationResponse;
import com.realtime.backend.controller.auth.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
  public AuthenticationResponse register(RegisterRequest request){
    return null;
  }
  public AuthenticationResponse authenticate(AuthenticationRequest request){
    return null;
  }
}
