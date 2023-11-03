package com.realtime.backend.repository;

import com.realtime.backend.model.Follower;
import com.realtime.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface FollowerRepository  extends JpaRepository<Follower,Integer> {

}
