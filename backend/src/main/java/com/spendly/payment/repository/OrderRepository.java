package com.spendly.payment.repository;

import com.spendly.payment.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface OrderRepository extends MongoRepository<Order, String> {
    Optional<Order> findByRazorpayOrderId(String razorpayOrderId);
}
