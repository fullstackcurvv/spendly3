package com.spendly.repository.mongodb;

import com.spendly.model.User;
import com.spendly.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class MongoUserAdapter implements UserRepository {

    private final UserMongoRepository mongo;

    @Override public User save(User user)                        { return mongo.save(user); }
    @Override public Optional<User> findById(String id)         { return mongo.findById(id); }
    @Override public Optional<User> findByEmail(String email)   { return mongo.findByEmail(email); }
    @Override public boolean existsByEmail(String email)        { return mongo.existsByEmail(email); }
    @Override public void deleteById(String id)                 { mongo.deleteById(id); }
}
