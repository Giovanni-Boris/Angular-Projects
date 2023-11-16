package com.realtime.backend.service;

import com.realtime.backend.controller.mesage.MessageRequest;
import com.realtime.backend.controller.mesage.MessageResponseDTO;
import com.realtime.backend.model.Message;
import com.realtime.backend.repository.ConversationRepository;
import com.realtime.backend.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class MessageService {
  private final MessageRepository messageRepository;
  private final ConversationRepository conversationRepository;
  public MessageResponseDTO createMessage(MessageRequest messageRequest) {
    var conversation = conversationRepository.findById(messageRequest.getConversationId())
      .orElseThrow(() -> new NoSuchElementException("Conversation not found "));
    var message = Message.builder()
      .text(messageRequest.getText())
      .owner(messageRequest.getOwner())
      .conversation(conversation)
      .build();
    messageRepository.save(message);
    conversationRepository.save(conversation);
    return generateResponse(message);
  }
  public List<MessageResponseDTO> getMessages(Integer conversationId) {
    var conversation = conversationRepository.findById(conversationId)
      .orElseThrow(() -> new NoSuchElementException("Conversation not found "));
    return conversation.getMessages().stream()
      .map(el->generateResponse(el)).toList();
  }
  public MessageResponseDTO generateResponse(Message msg){
    return MessageResponseDTO.builder()
      .id(msg.getId())
      .owner(msg.getOwner())
      .text(msg.getText())
      .creationdate(msg.getCreationdate())
      .build();
  }
}

