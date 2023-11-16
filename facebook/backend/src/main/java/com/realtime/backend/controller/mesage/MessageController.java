package com.realtime.backend.controller.mesage;

import com.realtime.backend.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/message")
@RequiredArgsConstructor
public class MessageController  {
  private final MessageService messageService;
  @PostMapping("/")
  public ResponseEntity<MessageResponseDTO> createMessage(@RequestBody MessageRequest messageRequest) {
    return ResponseEntity.ok(messageService.createMessage(messageRequest));
  }
  @GetMapping("/{conversationId}")
  public ResponseEntity<List<MessageResponseDTO>> getMessages(@PathVariable Integer conversationId) {
    return ResponseEntity.ok(messageService.getMessages(conversationId));
  }
}
