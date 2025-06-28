package com.mouramateus.melhoria_continua.controller;

import com.mouramateus.melhoria_continua.entities.User;
import com.mouramateus.melhoria_continua.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    @PutMapping("/{id}/profile")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> updateUserProfile(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String profile = body.get("profile");
        User updatedUser = userService.updateProfile(id, profile);
        return ResponseEntity.ok(updatedUser);
    }
}
