package com.realtime.backend.controller.post;


import com.realtime.backend.service.PostService;
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
  @DeleteMapping("/{id}")
  public ResponseEntity<Object> likePost(@PathVariable Integer id, @RequestBody PostRequestId postRequestId){
    return ResponseEntity.ok(postService.deletePost(id,postRequestId.getUserId()));
  }

  //like a post
  @PutMapping("/{id}/like")
  public ResponseEntity<Object> likePost(@PathVariable Integer id, @RequestBody PostRequest postRequest) {
    return ResponseEntity.ok(postService.likePost(id, postRequest.getUserId()));
  }
  @GetMapping("/{id}")
  public ResponseEntity<Object> getPost(@PathVariable Integer id){
    return ResponseEntity.ok(postService.getPost(id));
  }
  @GetMapping("/timeline/{userId}")
  public ResponseEntity<Object> getTimelinePosts(@PathVariable Integer userId){
    return ResponseEntity.ok(postService.getTimelinePosts(userId));
  }
  @GetMapping("/profile/{name}")
  public ResponseEntity<Object> getAllPosts(@PathVariable String name){
    return ResponseEntity.ok(postService.getAllPosts(name));
  }



}
