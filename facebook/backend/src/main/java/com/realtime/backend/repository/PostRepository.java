package com.realtime.backend.repository;

import com.realtime.backend.model.Follower;
import com.realtime.backend.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post,Integer> {

}
