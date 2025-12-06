package com.retail.retail_micro_servers.controller;

import com.retail.retail_micro_servers.dto.LoginRequest;
import com.retail.retail_micro_servers.dto.LoginResponse;
import com.retail.retail_micro_servers.user.User;
import com.retail.retail_micro_servers.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class AuthController {

    private final UserRepository userRepository;

    @Autowired
    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/api/auth/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }

        User user = userOpt.get();
        // Simple plaintext comparison for now; replace with hashing later if needed
        if (user.getPassword() == null || !user.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }

        LoginResponse resp = new LoginResponse(user.getUsername(), user.getRole(), user.getMailId());
        return ResponseEntity.ok(resp);
    }
}
