package com.spendly.payment.util;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;

public class SignatureVerifier {

    public static boolean verify(String razorpayOrderId,
                                  String razorpayPaymentId,
                                  String receivedSignature,
                                  String secret) {
        String payload = razorpayOrderId + "|" + razorpayPaymentId;
        return hmac(payload, secret).equals(receivedSignature);
    }

    public static boolean verifyWebhook(String rawBody,
                                         String receivedSignature,
                                         String secret) {
        if (secret == null || secret.isBlank()) return true; // skip if not configured
        return hmac(rawBody, secret).equals(receivedSignature);
    }

    private static String hmac(String data, String secret) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
            byte[] raw = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder(raw.length * 2);
            for (byte b : raw) sb.append(String.format("%02x", b));
            return sb.toString();
        } catch (Exception e) {
            throw new RuntimeException("HMAC computation failed", e);
        }
    }
}
