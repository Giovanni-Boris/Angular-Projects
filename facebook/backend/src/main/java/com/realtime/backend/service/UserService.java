package com.realtime.backend.service;

import com.realtime.backend.controller.exception.AlreadyFollowingException;
import com.realtime.backend.controller.exception.NotFollowerException;
import com.realtime.backend.controller.user.FriendsResponse;
import com.realtime.backend.controller.user.UserRequest;
import com.realtime.backend.controller.user.UserGetResponse;
import com.realtime.backend.model.*;
import com.realtime.backend.repository.FollowerRepository;
import com.realtime.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  public String updateUser(UserRequest updatedUser) {
    Optional<User> currentUser =  userRepository.findById(updatedUser.getUserId());
    if(!currentUser.isPresent()) throw new NoSuchElementException("User not found");
    if(updatedUser.getPassword()!=null){
      String newpassword = passwordEncoder.encode(updatedUser.getPassword());
      currentUser.get().setPassword(newpassword);
    }
    userRepository.save(currentUser.get());
    return "account has been updated";
  }
  public String deleteUser(Integer userId) {
    Optional<User> userDeleted = userRepository.findById(userId);
    if(!userDeleted.isPresent()) throw new NoSuchElementException("User not found");
    userRepository.deleteById(userId);
    return "account has been deleted";
  }

  public UserGetResponse getUser(Integer userId, String name) {
    Optional<User> user;
    if(userId!=null) user = userRepository.findById(userId);
    else  user = userRepository.findByName(name);
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
    var user = userRepository.findById(userId).orElseThrow(() -> new NoSuchElementException("the user with ID " + userId + " is not found "));
    var userToFollow = userRepository.findById(followUserId).orElseThrow(() -> new NoSuchElementException("the user to follow with ID " + followUserId + " is not found "));
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
    userRepository.save(user);
    userRepository.save(userToFollow);
    return "user has been followed";
  }
  @Transactional
  public String unfollowUser(Integer userId, Integer unfollowUserId) {
    var user = userRepository.findById(userId).orElseThrow(() -> new NoSuchElementException("the user with ID " + userId + " is not found "));
    var userToFollow = userRepository.findById(unfollowUserId).orElseThrow(() -> new NoSuchElementException("the user to follow with ID " + unfollowUserId + " is not found "));
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

    if(!user.getFollowers().contains(follower)) throw new NotFollowerException("you dont follow this user");
    user.removeFollower(follower);
    userToFollow.removeFollowing(following);
    System.out.println("lista   "+user.getFollowers().size());

    userRepository.save(user);
    userRepository.save(userToFollow);
    return  "user has been unfollowed";
  }

  public List<FriendsResponse> getFriends(Integer userId) {
    var followersList = userRepository.findById(userId)
      .orElseThrow(() -> new NoSuchElementException("the user with ID " + userId + " is not found "))
      .getFollowers();
    return followersList.stream()
      .map(follower->{
        var friend = userRepository
          .findById(follower.getUserId())
          .orElseThrow(() -> new NoSuchElementException("the user with ID " + follower.getUserId() + " is not found "));
        return FriendsResponse.builder()
          ._id(friend.getId())
          .name(friend.getName())
          .profilePicture(friend.getProfilePicture())
          .build();

      })
      .collect(Collectors.toList());
  }


}
