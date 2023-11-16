package com.realtime.backend.controller.conversation;

import com.realtime.backend.controller.exception.UnauthorizedAccessException;
import com.realtime.backend.service.ConversationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/conversation")
@RequiredArgsConstructor
public class ConversationController {
  private final ConversationService conversationService;
  @PostMapping("/")
    public ResponseEntity<ConversationResponseDTO> createConversation(@RequestBody ConversationRequest updatedUser) {
    return ResponseEntity.ok(conversationService.createConversation(updatedUser));
  }
  @GetMapping("/{userId}")
  public ResponseEntity<List<ConversationResponseDTO>> getConversation(@PathVariable Integer userId) {
    return ResponseEntity.ok(conversationService.getConversation(userId));
  }
  @GetMapping("/find/{firstUserId}/{secondUserId}")
  public ResponseEntity<ConversationResponseDTO> getConversationMembers(@PathVariable Integer firstUserId, @PathVariable Integer secondUserId) {
    return ResponseEntity.ok(conversationService.getConversationMembers(firstUserId,secondUserId));
  }
}
