package com.spendly.repository;

import com.spendly.model.User;

import java.util.Optional;

public interface UserRepository {
    User save(User user);
    Optional<User> findById(String id);
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    void deleteById(String id);
}
