package com.spendly.payment.controller;

import com.spendly.payment.dto.*;
import com.spendly.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/orders")
    public ResponseEntity<CreateOrderResponse> createOrder(
            @RequestBody CreateOrderRequest req,
            Authentication auth) {
        String userId = auth != null ? auth.getName() : null;
        return ResponseEntity.ok(paymentService.createOrder(req, userId));
    }

    @PostMapping("/verify")
    public ResponseEntity<VerifyPaymentResponse> verifyPayment(
            @RequestBody VerifyPaymentRequest req,
            Authentication auth) {
        String userId = auth != null ? auth.getName() : null;
        return ResponseEntity.ok(paymentService.verifyPayment(req, userId));
    }

    @PostMapping("/webhook")
    public ResponseEntity<Void> webhook(
            @RequestHeader(value = "X-Razorpay-Signature", required = false) String sig,
            @RequestBody String rawBody) {
        paymentService.handleWebhook(rawBody, sig);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/access")
    public ResponseEntity<AccessCheckResponse> checkAccess(@RequestParam String accessToken) {
        return ResponseEntity.ok(paymentService.checkAccess(accessToken));
    }
}
