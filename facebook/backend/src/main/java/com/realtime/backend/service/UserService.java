package com.realtime.backend.service;

import com.realtime.backend.controller.user.UserDTO;
import com.realtime.backend.controller.user.UserGetResponse;
import com.realtime.backend.model.User;
import com.realtime.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository repository;
  private final PasswordEncoder passwordEncoder;
  public void updateUser(UserDTO updatedUser) {
    Optional<User> currentUser =  repository.findById(updatedUser.getUserId());
    if(!currentUser.isPresent()) throw new NoSuchElementException();
    if(updatedUser.getPassword()!=null){
      String newpassword = passwordEncoder.encode(updatedUser.getPassword());
      currentUser.get().setPassword(newpassword);
    }
    repository.save(currentUser.get());
  }
  public void deleteUser(Integer userId) {
    Optional<User> userDeleted = repository.findById(userId);
    if(!userDeleted.isPresent()) throw new NoSuchElementException();
    repository.deleteById(userId);
  }

  public UserGetResponse getUser(Integer userId, String name) {
    Optional<User> user;
    if(userId!=null) user = repository.findById(userId);
    else  user = repository.findByName(name);
    if(!user.isPresent()) throw new NoSuchElementException();

    return UserGetResponse.builder()
      .userId(user.get().getId())
      .email(user.get().getEmail())
      .name(user.get().getName())
      .profilePicture(user.get().getProfilePicture())
      .coverPicture(user.get().getCoverPicture())
      .description(user.get().getDescription())
      .country(user.get().getCountry())
      .relationship(user.get().getRelationship())
      .build();
  }
}
