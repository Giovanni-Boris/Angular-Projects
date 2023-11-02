package com.realtime.backend.controller.user;

import com.realtime.backend.controller.exception.UnauthorizedAccessException;
import com.realtime.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
  @GetMapping
  public ResponseEntity<Object> getUser(
    @RequestParam(required = false) Integer userId,
    @RequestParam(required = false) String name
  ){
    return ResponseEntity.ok(userService.getUser(userId, name));
  }
  @PutMapping("/follow/{id}")
  public ResponseEntity<Object> followUser(@PathVariable Integer id, @RequestBody FollowRequest followRequest) {
    if (id.equals(followRequest.getFollowUserId()))  throw new UnauthorizedAccessException("you cant follow yourself");
      //return ResponseEntity.ok(userService.followUser(id, followRequest.getFollowUserId()));
    return ResponseEntity.ok("Usuario seguido con éxito");
  }

}
