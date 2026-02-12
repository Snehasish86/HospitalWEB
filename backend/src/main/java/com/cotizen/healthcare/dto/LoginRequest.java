package com.cotizen.healthcare.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String identifier; // Can be phone or email
    private String password;
    private String mfaCode; // For 2FA prompt
}
