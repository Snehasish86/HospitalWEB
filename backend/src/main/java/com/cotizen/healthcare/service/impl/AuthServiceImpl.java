package com.cotizen.healthcare.service.impl;

import com.cotizen.healthcare.dto.AuthResponse;
import com.cotizen.healthcare.dto.LoginRequest;
import com.cotizen.healthcare.dto.RegisterRequest;
import com.cotizen.healthcare.model.User;
import com.cotizen.healthcare.model.UserRole;
import com.cotizen.healthcare.repository.UserRepository;
import com.cotizen.healthcare.security.SecurityUser;
import com.cotizen.healthcare.service.AuthService;
import com.cotizen.healthcare.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public AuthResponse register(RegisterRequest request) {
        if (repository.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new RuntimeException("Phone number already registered");
        }

        var user = new User();
        user.setFullName(request.getFullName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole() != null ? request.getRole() : UserRole.PATIENT);
        user.setUhid(generateUhid());

        // MVP: Using phone as ID for token subject initially, but SecurityUser uses
        // UHID
        // We will save first to get ID/UHID
        repository.save(user);

        var securityUser = new SecurityUser(user);
        var jwtToken = jwtService.generateToken(securityUser);
        var refreshToken = jwtService.generateRefreshToken(securityUser);

        return AuthResponse.builder()
                .token(jwtToken)
                .refreshToken(refreshToken)
                .uhid(user.getUhid())
                .fullName(user.getFullName())
                .phoneNumber(user.getPhoneNumber())
                .role(user.getRole().toString())
                .build();
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        var user = repository.findByPhoneNumber(request.getIdentifier())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }

        var securityUser = new SecurityUser(user);
        var jwtToken = jwtService.generateToken(securityUser);
        var refreshToken = jwtService.generateRefreshToken(securityUser);

        return AuthResponse.builder()
                .token(jwtToken)
                .refreshToken(refreshToken)
                .uhid(user.getUhid())
                .fullName(user.getFullName())
                .phoneNumber(user.getPhoneNumber())
                .role(user.getRole().toString())
                .build();
    }

    private String generateUhid() {
        // Generate UHID in the format: MLD-########-####
        // Using timestamp for uniqueness and random for the suffix
        long timestamp = System.currentTimeMillis() % 100000000; // Get last 8 digits
        int random = (int) (Math.random() * 10000); // 4-digit random number
        return String.format("MLD-%08d-%04d", timestamp, random);
    }
}
