package com.mouramateus.melhoria_continua.controller;

import com.mouramateus.melhoria_continua.dto.LoginRequest;
import com.mouramateus.melhoria_continua.dto.LoginResponse;
import com.mouramateus.melhoria_continua.entities.User;
import com.mouramateus.melhoria_continua.repositories.UserRepository;
import com.mouramateus.melhoria_continua.config.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(), loginRequest.getPassword()
                )
        );

        UserDetails userDetails = (UserDetails) auth.getPrincipal();

        String token = jwtService.generateToken(userDetails.getUsername());

        User usuario = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        return new LoginResponse(token, usuario.getName(), usuario.getProfile().name(), usuario.getId());
    }

}
