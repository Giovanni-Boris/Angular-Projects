package com.realtime.backend.controller.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;
import java.util.NoSuchElementException;

@ControllerAdvice
public class ControllerExceptionHandler {

  @ExceptionHandler(UnauthorizedAccessException.class)
  public ResponseEntity<ErrorDetails> handleUnauthorizedAccessException(UnauthorizedAccessException exception, WebRequest request) {
    return new ResponseEntity<>(new ErrorDetails(new Date(), exception.getMessage(), request.getDescription(false)), HttpStatus.FORBIDDEN);
  }

  @ExceptionHandler(AlreadyFollowingException.class)
  public ResponseEntity<ErrorDetails> alreadyFollowingException(AlreadyFollowingException exception, WebRequest request) {
    return new ResponseEntity<>(new ErrorDetails(new Date(), exception.getMessage(), request.getDescription(false)), HttpStatus.FORBIDDEN);
  }

  @ExceptionHandler(NoSuchElementException.class)
  public ResponseEntity<ErrorDetails> noSuchElementException(NoSuchElementException exception, WebRequest request) {
    return new ResponseEntity<>(new ErrorDetails(new Date(), exception.getMessage(), request.getDescription(false)), HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorDetails> globalExceptionHandling(Exception exception, WebRequest request) {
    return new ResponseEntity<>(new ErrorDetails(new Date(), exception.getMessage(), request.getDescription(false)), HttpStatus.INTERNAL_SERVER_ERROR);
  }


}