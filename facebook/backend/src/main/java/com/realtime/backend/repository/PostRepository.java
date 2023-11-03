package com.realtime.backend.repository;

import com.realtime.backend.model.Follower;
import com.realtime.backend.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post,Integer> {
  List<Post> findByUser_Id(Integer integer);
}
