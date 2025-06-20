package com.mouramateus.melhoria_continua.controller;

import com.mouramateus.melhoria_continua.dto.MoreIdeasDTO;
import com.mouramateus.melhoria_continua.mapper.MoreIdeasMapper;
import com.mouramateus.melhoria_continua.services.MoreIdeasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/more-ideas")
public class MoreIdeasController {

    @Autowired
    public MoreIdeasService service;

    @PostMapping
    public MoreIdeasDTO criarIdeia(@RequestBody MoreIdeasDTO dto,
                                   @RequestPart(value = "imagem", required = false) MultipartFile imagem) throws IOException {
        MoreIdeasDTO salvaDTO = service.save(dto, imagem);
        return salvaDTO;

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
