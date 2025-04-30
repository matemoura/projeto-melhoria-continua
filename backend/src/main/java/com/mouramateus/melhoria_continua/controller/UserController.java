package com.mouramateus.melhoria_continua.controller;

import com.mouramateus.melhoria_continua.dto.UserDTO;
import com.mouramateus.melhoria_continua.entities.User;
import com.mouramateus.melhoria_continua.repositories.UserRepository;
import com.mouramateus.melhoria_continua.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public UserDTO criarUsuario(@RequestBody UserDTO userDTO) {
        return userService.save(userDTO);
    }

    @GetMapping
    public List<UserDTO> listarUsuarios() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public UserDTO buscarUsuario(@PathVariable long id) {
        Optional<User> userOpt = userRepository.findById(id);
        return userOpt.map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    @DeleteMapping("/{id}")
    public void deletarUsuario(@PathVariable long id) {
        userService.deleteById(id);
    }
}
