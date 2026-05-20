package com.spendly.payment.dto;

import lombok.Data;

@Data
public class CreateOrderRequest {
    private long amount;      // paise
    private String courseId;
}
