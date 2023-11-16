package com.realtime.backend.repository;
import com.realtime.backend.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository  extends JpaRepository<Message,Integer> {
}
