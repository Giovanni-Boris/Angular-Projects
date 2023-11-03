package com.realtime.backend.service;

import com.realtime.backend.controller.post.PostRequest;
import com.realtime.backend.controller.post.PostResponse;
import com.realtime.backend.model.Post;
import com.realtime.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.NoSuchElementException;
@Service
@RequiredArgsConstructor
public class PostService {
  private final UserRepository userRepository;
  public PostResponse createPost(PostRequest postRequest) {
    var user = userRepository.findById(postRequest.getUserId())
      .orElseThrow(() -> new NoSuchElementException("User not found "));
    var post = Post.builder()
      .likes(new ArrayList<>())
      .img(postRequest.getImg())
      .description(postRequest.getDescription())
      .user(user)
      .build();
    user.addPost(post);
    userRepository.save(user);
    return PostResponse.builder()
      .likes(post.getLikes())
      .img(post.getImg())
      .description(post.getDescription())
      .userId(user.getId())
      .build();
  }
}
