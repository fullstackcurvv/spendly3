package com.spendly.service;

import com.spendly.dto.*;
import com.spendly.model.User;

public interface UserService {
    User register(RegisterRequest req);
    LoginResponse login(LoginRequest req);
    User findById(String id);
    User updateName(String id, String name);
    void changePassword(String id, String currentPassword, String newPassword);
}
