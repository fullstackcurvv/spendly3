package com.spendly.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AccessCheckResponse {
    private boolean hasAccess;
}
