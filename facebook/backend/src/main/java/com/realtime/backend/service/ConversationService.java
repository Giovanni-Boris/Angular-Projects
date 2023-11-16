package com.realtime.backend.service;

import com.realtime.backend.controller.conversation.ConversationRequest;
import com.realtime.backend.controller.conversation.ConversationResponseDTO;
import com.realtime.backend.controller.exception.NotFollowerException;
import com.realtime.backend.model.Conversation;
import com.realtime.backend.model.Message;
import com.realtime.backend.repository.ConversationRepository;
import com.realtime.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConversationService {
  private final ConversationRepository conversationRepository;
  private final UserRepository userRepository;
  public ConversationResponseDTO createConversation(ConversationRequest conversationRequest) {
    if(conversationRequest.getSenderId()==conversationRequest.getReceiverId()) throw new NoSuchElementException("Id must be differents");
    var user1 = userRepository.findById(conversationRequest.getSenderId())
      .orElseThrow(() -> new NoSuchElementException("User not found: " + conversationRequest.getSenderId()));

    var user2 = userRepository.findById(conversationRequest.getReceiverId())
      .orElseThrow(() -> new NoSuchElementException("User not found: " + conversationRequest.getReceiverId()));
    var conversation = Conversation.builder()
        .users(List.of(user1,user2))
        .messages(new ArrayList<>())
        .build();
    user1.getConversations().add(conversation);
    user2.getConversations().add(conversation);
    conversationRepository.save(conversation);
    userRepository.save(user1);
    userRepository.save(user2);
    return conversationResponseDTOResponse(conversation);
  }
  public List<ConversationResponseDTO> getConversation(Integer userId){
    var conversations = conversationRepository.findByUserId(userId);
    return conversations.stream()
      .map(this::conversationResponseDTOResponse
      )
      .collect(Collectors.toList());

  }
  public ConversationResponseDTO getConversationMembers(Integer firstUserId,Integer secondUserId){
    var conversation = conversationRepository.findByUserIds(firstUserId, secondUserId)
      .orElseThrow(() -> new NoSuchElementException("Conversation ot found"));
    return conversationResponseDTOResponse(conversation);
  }
  public ConversationResponseDTO conversationResponseDTOResponse(Conversation conversation){
    return ConversationResponseDTO.builder()
      .id(conversation.getId())
      .members(new int []{ conversation.getUsers().get(0).getId(), conversation.getUsers().get(1).getId() })
      .build();
  }
}
