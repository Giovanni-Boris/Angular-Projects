package com.realtime.backend.controller.user;

import com.realtime.backend.controller.exception.UnauthorizedAccessException;
import com.realtime.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;

  @PutMapping("/{id}")
  public ResponseEntity<Object> updateUser(@PathVariable Integer id, @RequestBody UserRequest updatedUser) {
    if (!id.equals(updatedUser.getUserId())) throw new UnauthorizedAccessException("User can be modified but other.");
    return ResponseEntity.ok(userService.updateUser(updatedUser));
  }
  @DeleteMapping("/{id}")
  public ResponseEntity<Object> deleteUser(@PathVariable Integer id, @RequestBody UserRequest deleteUser) {
    if (!id.equals(deleteUser.getUserId())) throw new UnauthorizedAccessException("User can be deleted but other.");
    return ResponseEntity.ok(userService.deleteUser(deleteUser.getUserId()));
  }
  @GetMapping("/friends/{userId}")
  public ResponseEntity<List<FriendsResponse>> getFriends(@PathVariable Integer userId) {
    return ResponseEntity.ok(userService.getFriends(userId));
  }
  @GetMapping
  public ResponseEntity<Object> getUser(
    @RequestParam(required = false) Integer userId,
    @RequestParam(required = false) String name
  ){
    return ResponseEntity.ok(userService.getUser(userId, name));
  }
  @PutMapping("/{id}/follow")
  public ResponseEntity<Object> followUser(@PathVariable Integer id, @RequestBody FollowRequest user) {
    if (id.equals(user.getUserId()))  throw new UnauthorizedAccessException("you can't follow yourself");
    return ResponseEntity.ok(userService.followUser(user.getUserId(),id));
  }

  @PutMapping("/{id}/unfollow")
  public ResponseEntity<Object> unfollowUser(@PathVariable Integer id, @RequestBody FollowRequest user) {
    if (id.equals(user.getUserId()))  throw new UnauthorizedAccessException("you can't unfollow yourself");
    return ResponseEntity.ok(userService.unfollowUser(user.getUserId(),id));
  }

}
