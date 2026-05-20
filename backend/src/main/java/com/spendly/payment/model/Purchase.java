package com.spendly.payment.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Document(collection = "purchases")
public class Purchase {
    @Id
    private String id;
    private String userId;
    private String courseId;
    private String orderId;
    private String razorpayPaymentId;
    private long amount;
    private String accessToken;    // UUID — used to gate /course/video
    private Instant purchasedAt = Instant.now();
}
