package com.spendly.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateOrderResponse {
    private String razorpayOrderId;
    private long amount;
    private String currency;
    private String keyId;
}
