package com.spendly.payment.service;

import com.spendly.payment.dto.*;

public interface PaymentService {
    CreateOrderResponse createOrder(CreateOrderRequest req, String userId);
    VerifyPaymentResponse verifyPayment(VerifyPaymentRequest req, String userId);
    AccessCheckResponse checkAccess(String accessToken);
    void handleWebhook(String rawBody, String signature);
}
