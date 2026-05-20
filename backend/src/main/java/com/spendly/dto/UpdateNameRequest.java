package com.spendly.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateNameRequest {
    @NotBlank private String name;
}
