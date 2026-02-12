package com.cotizen.healthcare.security;

import com.cotizen.healthcare.model.User;
import com.cotizen.healthcare.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Here username is treated as UHID because that's what we put in the token
        // subject
        User user = repository.findByUhid(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with UHID: " + username));

        return new SecurityUser(user);
    }
}
