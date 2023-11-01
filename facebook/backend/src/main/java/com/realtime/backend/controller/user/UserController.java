package com.realtime.backend.controller.user;

import com.realtime.backend.model.User;
import com.realtime.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;

  @PutMapping("/{id}")
  public ResponseEntity<Object> updateUser(@PathVariable Integer id, @RequestBody UserDTO updatedUser) {
    if (!id.equals(updatedUser.getUserId())) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body("User can be modified but other.");
    }
    try {
      userService.updateUser(updatedUser);
      return ResponseEntity.ok("account has been updated");
    } catch (NoSuchElementException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User Not found");
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Object> deleteUser(@PathVariable Integer id, @RequestBody UserDTO deleteUser) {
    if (!id.equals(deleteUser.getUserId())) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body("User can be deleted but other.");
    }
    try {
      userService.deleteUser(deleteUser.getUserId());
      return ResponseEntity.ok("account has been deleted");
    } catch (NoSuchElementException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User Not found");
    }
  }
  @GetMapping
  public ResponseEntity<Object> getUser(
    @RequestParam(required = false) Integer userId,
    @RequestParam(required = false) String name
  ){
    try {
      return ResponseEntity.ok(userService.getUser(userId, name));
    } catch (NoSuchElementException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User Not found");
    }
  }
}
