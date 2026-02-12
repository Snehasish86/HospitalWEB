package com.cotizen.healthcare.controller;

import com.cotizen.healthcare.dto.AuthResponse;
import com.cotizen.healthcare.dto.LoginRequest;
import com.cotizen.healthcare.dto.RegisterRequest;
import com.cotizen.healthcare.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            return ResponseEntity.ok(authService.register(request));
        } catch (RuntimeException e) {
            // Return user-friendly error message for duplicate phone numbers
            if (e.getMessage() != null && e.getMessage().contains("Phone number already registered")) {
                return ResponseEntity
                        .badRequest()
                        .body(java.util.Map.of("error", "This phone number is already registered. Please use a different number or login instead."));
            }
            // For other runtime exceptions, return generic error
            return ResponseEntity
                    .badRequest()
                    .body(java.util.Map.of("error", e.getMessage() != null ? e.getMessage() : "Registration failed. Please try again."));
        } catch (Exception e) {
            System.out.println("=== REGISTRATION ERROR ===");
            System.out.println("Error Type: " + e.getClass().getName());
            System.out.println("Error Message: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity
                    .internalServerError()
                    .body(java.util.Map.of("error", "An unexpected error occurred. Please try again later."));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
