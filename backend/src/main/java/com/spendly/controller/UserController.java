package com.spendly.controller;

import com.spendly.dto.*;
import com.spendly.model.User;
import com.spendly.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getMe(Authentication auth) {
        User user = userService.findById(auth.getName());
        return ResponseEntity.ok(
                new UserResponse(user.getId(), user.getName(), user.getEmail(),
                        user.getCreatedAt().toString()));
    }

    @PatchMapping("/me")
    public ResponseEntity<UserResponse> updateName(Authentication auth,
                                                    @Valid @RequestBody UpdateNameRequest req) {
        User user = userService.updateName(auth.getName(), req.getName());
        return ResponseEntity.ok(
                new UserResponse(user.getId(), user.getName(), user.getEmail(),
                        user.getCreatedAt().toString()));
    }

    @PatchMapping("/me/password")
    public ResponseEntity<Void> changePassword(Authentication auth,
                                                @Valid @RequestBody ChangePasswordRequest req) {
        userService.changePassword(auth.getName(), req.getCurrentPassword(), req.getNewPassword());
        return ResponseEntity.ok().build();
    }
}
