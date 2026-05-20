package com.spendly.payment.service;

import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.spendly.payment.dto.*;
import com.spendly.payment.model.Order;
import com.spendly.payment.model.Purchase;
import com.spendly.payment.repository.OrderRepository;
import com.spendly.payment.repository.PurchaseRepository;
import com.spendly.payment.util.SignatureVerifier;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final RazorpayClient razorpayClient;
    private final OrderRepository orderRepository;
    private final PurchaseRepository purchaseRepository;

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    @Value("${razorpay.webhook.secret:}")
    private String webhookSecret;

    @Override
    public CreateOrderResponse createOrder(CreateOrderRequest req, String userId) {
        try {
            JSONObject params = new JSONObject();
            params.put("amount", req.getAmount());
            params.put("currency", "INR");
            params.put("receipt", UUID.randomUUID().toString());

            com.razorpay.Order rzpOrder = razorpayClient.orders.create(params);
            String rzpOrderId = rzpOrder.get("id").toString();

            Order order = new Order();
            order.setRazorpayOrderId(rzpOrderId);
            order.setCourseId(req.getCourseId());
            order.setUserId(userId != null ? userId : "guest");
            order.setAmount(req.getAmount());
            order.setCurrency("INR");
            order.setStatus("CREATED");
            orderRepository.save(order);

            return new CreateOrderResponse(rzpOrderId, req.getAmount(), "INR", keyId);

        } catch (RazorpayException e) {
            throw new RuntimeException("Failed to create Razorpay order: " + e.getMessage(), e);
        }
    }

    @Override
    public VerifyPaymentResponse verifyPayment(VerifyPaymentRequest req, String userId) {
        Order order = orderRepository.findByRazorpayOrderId(req.getRazorpayOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if ("PAID".equals(order.getStatus())) {
            throw new RuntimeException("Order already processed");
        }

        boolean valid = SignatureVerifier.verify(
                req.getRazorpayOrderId(),
                req.getRazorpayPaymentId(),
                req.getRazorpaySignature(),
                keySecret
        );

        if (!valid) {
            order.setStatus("FAILED");
            order.setUpdatedAt(Instant.now());
            orderRepository.save(order);
            throw new RuntimeException("Invalid payment signature");
        }

        order.setStatus("PAID");
        order.setRazorpayPaymentId(req.getRazorpayPaymentId());
        order.setUpdatedAt(Instant.now());
        orderRepository.save(order);

        String accessToken = UUID.randomUUID().toString();
        Purchase purchase = new Purchase();
        purchase.setUserId(userId != null ? userId : "guest");
        purchase.setCourseId(req.getCourseId() != null ? req.getCourseId() : order.getCourseId());
        purchase.setOrderId(order.getId());
        purchase.setRazorpayPaymentId(req.getRazorpayPaymentId());
        purchase.setAmount(order.getAmount());
        purchase.setAccessToken(accessToken);
        purchaseRepository.save(purchase);

        return new VerifyPaymentResponse(true, accessToken, "Payment verified successfully");
    }

    @Override
    public AccessCheckResponse checkAccess(String accessToken) {
        return new AccessCheckResponse(purchaseRepository.existsByAccessToken(accessToken));
    }

    @Override
    public void handleWebhook(String rawBody, String signature) {
        if (!SignatureVerifier.verifyWebhook(rawBody, signature, webhookSecret)) {
            throw new RuntimeException("Invalid webhook signature");
        }

        try {
            JSONObject body  = new JSONObject(rawBody);
            String event     = body.getString("event");
            JSONObject entity = body
                    .getJSONObject("payload")
                    .getJSONObject("payment")
                    .getJSONObject("entity");

            String rzpOrderId = entity.getString("order_id");
            String rzpPayId   = entity.getString("id");

            orderRepository.findByRazorpayOrderId(rzpOrderId).ifPresent(order -> {
                if ("payment.captured".equals(event) && !"PAID".equals(order.getStatus())) {
                    order.setStatus("PAID");
                    order.setRazorpayPaymentId(rzpPayId);
                    order.setUpdatedAt(Instant.now());
                    orderRepository.save(order);
                } else if ("payment.failed".equals(event) && "CREATED".equals(order.getStatus())) {
                    order.setStatus("FAILED");
                    order.setUpdatedAt(Instant.now());
                    orderRepository.save(order);
                }
            });
        } catch (Exception e) {
            // Log but don't throw — Razorpay retries on non-200 responses
        }
    }
}
