package com.realtime.backend.repository;

import com.realtime.backend.model.Conversation;
import com.realtime.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ConversationRepository extends JpaRepository<Conversation,Integer> {
  @Query("SELECT DISTINCT c FROM Conversation c JOIN c.users u WHERE u.id = :userId")
  List<Conversation> findByUserId(Integer userId);
  @Query("SELECT DISTINCT c FROM Conversation c " +
    "WHERE :firstUserId IN (SELECT u.id FROM c.users u) AND :secondUserId IN (SELECT u.id FROM c.users u)")
  Optional<Conversation> findByUserIds(Integer firstUserId, Integer secondUserId);
}
