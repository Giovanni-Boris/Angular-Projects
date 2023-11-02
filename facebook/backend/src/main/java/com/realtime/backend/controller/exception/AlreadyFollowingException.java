package com.realtime.backend.controller.exception;

public class AlreadyFollowingException extends RuntimeException {
  public AlreadyFollowingException(String message) {
    super(message);
  }
}
