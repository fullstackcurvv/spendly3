package com.spendly.payment.repository;

import com.spendly.payment.model.Purchase;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PurchaseRepository extends MongoRepository<Purchase, String> {
    boolean existsByAccessToken(String accessToken);
    boolean existsByUserIdAndCourseId(String userId, String courseId);
}
