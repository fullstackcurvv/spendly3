package com.spendly.payment.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Document(collection = "orders")
public class Order {
    @Id
    private String id;
    private String razorpayOrderId;
    private String courseId;
    private String userId;
    private long amount;           // paise
    private String currency;
    private String status;         // CREATED | PAID | FAILED
    private String razorpayPaymentId;
    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();
}
