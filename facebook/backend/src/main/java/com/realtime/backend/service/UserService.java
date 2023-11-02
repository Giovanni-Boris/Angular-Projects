package com.realtime.backend.service;

import com.realtime.backend.controller.user.UserRequest;
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
  public String updateUser(UserRequest updatedUser) {
    Optional<User> currentUser =  repository.findById(updatedUser.getUserId());
    if(!currentUser.isPresent()) throw new NoSuchElementException("User not found");
    if(updatedUser.getPassword()!=null){
      String newpassword = passwordEncoder.encode(updatedUser.getPassword());
      currentUser.get().setPassword(newpassword);
    }
    repository.save(currentUser.get());
    return "account has been updated";
  }
  public String deleteUser(Integer userId) {
    Optional<User> userDeleted = repository.findById(userId);
    if(!userDeleted.isPresent()) throw new NoSuchElementException("User not found");
    repository.deleteById(userId);
    return "account has been deleted";
  }

  public UserGetResponse getUser(Integer userId, String name) {
    Optional<User> user;
    if(userId!=null) user = repository.findById(userId);
    else  user = repository.findByName(name);
    if(!user.isPresent()) throw new NoSuchElementException("User  with id: "+userId+" or name "+ name+" not found");

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
  public void followUser(Integer userId, Integer followUserId) {
    User user = repository.findById(userId).orElseThrow(() -> new NoSuchElementException("the user with ID " + userId + " is not found "));
    User userToFollow = repository.findById(followUserId).orElseThrow(() -> new NoSuchElementException("El usuario a seguir con ID " + followUserId + " no se encontró"));

    user.getFollowers().add(userToFollow);

    // Agregar user a la lista de followings de userToFollow
    userToFollow.getFollowings().add(user);

    // Guardar los cambios en la base de datos
    //userRepository.save(user);
    //userRepository.save(userToFollow);
  }
}
