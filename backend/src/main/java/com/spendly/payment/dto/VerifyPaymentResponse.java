package com.spendly.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class VerifyPaymentResponse {
    private boolean success;
    private String accessToken;
    private String message;
}
