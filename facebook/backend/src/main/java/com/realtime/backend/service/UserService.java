package com.realtime.backend.service;

import com.realtime.backend.controller.exception.AlreadyFollowingException;
import com.realtime.backend.controller.user.UserRequest;
import com.realtime.backend.controller.user.UserGetResponse;
import com.realtime.backend.model.Follower;
import com.realtime.backend.model.Following;
import com.realtime.backend.model.User;
import com.realtime.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
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
      .followings(user.get().getFollowings())
      .followers(user.get().getFollowers())
      .posts(user.get().getPosts())
      .build();
  }
  @Transactional
  public String followUser(Integer userId, Integer followUserId) {
    var user = repository.findById(userId).orElseThrow(() -> new NoSuchElementException("the user with ID " + userId + " is not found "));
    var userToFollow = repository.findById(followUserId).orElseThrow(() -> new NoSuchElementException("the user to follow with ID " + followUserId + " is not found "));
    var follower = Follower
      .builder()
      .to(user)
      .userId(userToFollow.getId())
      .build();
    var following = Following
      .builder()
      .from(userToFollow)
      .userId(user.getId())
      .build();

    if(user.getFollowers().contains(follower)) throw new AlreadyFollowingException("you allready follow this user");
    user.addFollower(follower);
    userToFollow.addFollowing(following);
    repository.save(user);
    repository.save(userToFollow);
    return "user has been followed";
  }
}
