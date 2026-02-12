package com.cotizen.healthcare.repository;

import com.cotizen.healthcare.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByUhid(String uhid);

    Optional<User> findByPhoneNumber(String phoneNumber);

    boolean existsByUhid(String uhid);

    boolean existsByPhoneNumber(String phoneNumber);
}
