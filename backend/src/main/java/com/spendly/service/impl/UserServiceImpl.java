package com.spendly.service.impl;

import com.spendly.dto.*;
import com.spendly.model.User;
import com.spendly.repository.UserRepository;
import com.spendly.service.UserService;
import com.spendly.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Override
    public User register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already in use");
        }
        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPasswordHash(passwordEncoder.encode(req.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public LoginResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
        if (!passwordEncoder.matches(req.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }
        return new LoginResponse(jwtUtil.generate(user.getId()),
                user.getId(), user.getName(), user.getEmail());
    }

    @Override
    public User findById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public User updateName(String id, String name) {
        User user = findById(id);
        user.setName(name);
        return userRepository.save(user);
    }

    @Override
    public void changePassword(String id, String currentPassword, String newPassword) {
        User user = findById(id);
        if (!passwordEncoder.matches(currentPassword, user.getPasswordHash())) {
            throw new RuntimeException("Current password is incorrect");
        }
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}
