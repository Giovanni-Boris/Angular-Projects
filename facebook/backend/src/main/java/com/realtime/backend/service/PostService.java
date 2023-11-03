package com.realtime.backend.service;

import com.realtime.backend.controller.exception.UnauthorizedAccessException;
import com.realtime.backend.controller.post.PostRequest;
import com.realtime.backend.controller.post.PostResponse;
import com.realtime.backend.model.Post;
import com.realtime.backend.model.PostLike;
import com.realtime.backend.model.User;
import com.realtime.backend.repository.PostRepository;
import com.realtime.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {
  private final UserRepository userRepository;
  private final PostRepository postRepository;

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
    return generateResponge(post, user);
  }
  //delete post
  public String deletePost(Integer id, Integer userId){
    var post = postRepository.findById(id)
      .orElseThrow(()-> new NoSuchElementException("Post not found"));
    if(!post.getUser().getId().equals(userId))
      throw  new UnauthorizedAccessException("you can only delete your post");
    postRepository.deleteById(id);
    return "the post has been deleted";
  }
  public String likePost(Integer id, Integer userId) {
    var post = postRepository.findById(id)
      .orElseThrow(()-> new NoSuchElementException("Post not found"));
    PostLike like = PostLike.builder()
      .user_like(post)
      .userId(userId)
      .build();
    if(post.getLikes().contains(like)){
      post.removeLike(like);
      postRepository.save(post);
      return "he post has been disliked";
    }
    post.addLike(like);
    postRepository.save(post);
    return "he post has been liked";
  }
  //get post
  public Post getPost(Integer id){
    return postRepository.findById(id)
      .orElseThrow(()-> new NoSuchElementException("Post not found"));
  }

  public List<Post> getAllPosts(String name){
    var user = userRepository.findByName(name)
      .orElseThrow(()-> new NoSuchElementException("User not found"));
    return user.getPosts();
  }

  //get a timelime posts
  public List<Post> getTimelinePosts(Integer userId){
    var currentUser = userRepository.findById(userId)
      .orElseThrow(()-> new NoSuchElementException("User not found"));
    var userPosts = currentUser.getPosts();
    List<Post> friendPosts = currentUser.getFollowers()
      .stream()
      .flatMap(follower -> postRepository.findByUser_Id(follower.getUserId()).stream())
      .toList();
    userPosts.addAll(friendPosts);
    return userPosts;

  }


  private PostResponse generateResponge(Post post, User user) {
    return PostResponse.builder()
      .likes(post.getLikes())
      .img(post.getImg())
      .description(post.getDescription())
      .userId(user.getId())
      .build();
  }

}
