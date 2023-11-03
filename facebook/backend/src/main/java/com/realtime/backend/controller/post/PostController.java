package com.realtime.backend.controller.post;

import com.realtime.backend.controller.exception.UnauthorizedAccessException;
import com.realtime.backend.controller.user.UserRequest;
import com.realtime.backend.service.PostService;
import com.realtime.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/post")
@RequiredArgsConstructor
public class PostController {
  private final PostService postService;
  @PostMapping("/")
  public ResponseEntity<Object> createPost(@RequestBody PostRequest postRequest) {
    return ResponseEntity.ok(postService.createPost(postRequest));
  }
  //like a post
  @PutMapping("/:id/like")
  public ResponseEntity<Object> likePost(@PathVariable Integer id, @RequestBody PostRequest postRequest) {
    return ResponseEntity.ok(postService.likePost(id, postRequest.getUserId()));
  }

}
