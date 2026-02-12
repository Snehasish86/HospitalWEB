package com.cotizen.healthcare.dto;

import com.cotizen.healthcare.model.UserRole;
import lombok.Data;

@Data
public class RegisterRequest {
    private String fullName;
    private String phoneNumber;
    private String email;
    private String password;
    private UserRole role; // Optional, defaults to PATIENT usually
}
