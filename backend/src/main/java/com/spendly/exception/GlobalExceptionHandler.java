package com.spendly.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntime(RuntimeException ex) {
        String msg = ex.getMessage() != null ? ex.getMessage() : "Unexpected error";
        HttpStatus status;
        if (msg.contains("not found")) {
            status = HttpStatus.NOT_FOUND;
        } else if (msg.contains("Invalid credenti")) {
            status = HttpStatus.UNAUTHORIZED;
        } else if (msg.contains("already")) {
            status = HttpStatus.CONFLICT;
        } else if (msg.contains("signature") || msg.contains("Invalid")) {
            status = HttpStatus.BAD_REQUEST;
        } else {
            status = HttpStatus.BAD_REQUEST;
        }
        return ResponseEntity.status(status).body(Map.of("error", msg));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidation(MethodArgumentNotValidException ex) {
        String msg = ex.getBindingResult().getFieldErrors().stream()
                .map(e -> e.getField() + ": " + e.getDefaultMessage())
                .findFirst()
                .orElse("Validation failed");
        return ResponseEntity.badRequest().body(Map.of("error", msg));
    }
}
