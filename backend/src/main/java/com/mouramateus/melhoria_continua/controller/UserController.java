package com.mouramateus.melhoria_continua.controller;

import com.mouramateus.melhoria_continua.dto.UserDTO;
import com.mouramateus.melhoria_continua.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "")
public class UserController {

    @Autowired
    private UserService userService;

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
        return userService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void deletarUsuario(@PathVariable long id) {
        userService.deleteById(id);
    }
}
