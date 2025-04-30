package com.mouramateus.melhoria_continua.controller;

import com.mouramateus.melhoria_continua.dto.MoreIdeasDTO;
import com.mouramateus.melhoria_continua.services.MoreIdeasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/more-ideas")
@CrossOrigin(origins = "*")
public class MoreIdeasController {

    @Autowired
    public MoreIdeasService service;

    @PostMapping
    public MoreIdeasDTO criarIdeia(@RequestBody MoreIdeasDTO dto) {
        return service.save(dto);
    }

    @GetMapping
    public List<MoreIdeasDTO> listarIdeas() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public MoreIdeasDTO buscarPorId(@PathVariable Long id) {
        return service.findById(id);
    }

    @DeleteMapping("/{id}")
    public void excluirIdea(@PathVariable Long id) {
        service.delete(id);
    }
}
