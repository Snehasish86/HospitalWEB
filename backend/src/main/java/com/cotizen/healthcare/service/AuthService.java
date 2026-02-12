package com.cotizen.healthcare.service;

import com.cotizen.healthcare.dto.AuthResponse;
import com.cotizen.healthcare.dto.LoginRequest;
import com.cotizen.healthcare.dto.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}
