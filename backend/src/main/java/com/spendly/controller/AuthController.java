package com.spendly.controller;

import com.spendly.dto.*;
import com.spendly.model.User;
import com.spendly.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest req) {
        User user = userService.register(req);
        return ResponseEntity.ok(
                new UserResponse(user.getId(), user.getName(), user.getEmail(),
                        user.getCreatedAt().toString()));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest req) {
        return ResponseEntity.ok(userService.login(req));
    }
}
