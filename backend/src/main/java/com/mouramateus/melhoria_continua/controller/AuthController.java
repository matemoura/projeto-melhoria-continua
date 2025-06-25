package com.mouramateus.melhoria_continua.controller;

import com.mouramateus.melhoria_continua.dto.RegisterRequest;
import com.mouramateus.melhoria_continua.entities.User;
import com.mouramateus.melhoria_continua.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody RegisterRequest request) {
        User registeredUser = authService.register(request);
        Map<String, String> response = authService.login(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        Map<String, String> response = authService.login(email, password);
        return ResponseEntity.ok(response);
    }
}
