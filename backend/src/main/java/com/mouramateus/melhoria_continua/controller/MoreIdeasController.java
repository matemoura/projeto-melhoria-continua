package com.mouramateus.melhoria_continua.controller;

import com.mouramateus.melhoria_continua.dto.MoreIdeasDTO;
import com.mouramateus.melhoria_continua.entities.MoreIdeas;
import com.mouramateus.melhoria_continua.services.MoreIdeasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping("/criar")
    public ResponseEntity<MoreIdeas> criarMaisIdeias(
            @RequestPart("formulario") MoreIdeasDTO dto,
            @RequestPart(value = "imagem", required = false) MultipartFile imagem) {
        MoreIdeas moreIdeas = converterParaEntidade(dto);
        MoreIdeas salvo = service.salvarComImagem(moreIdeas, imagem);
        return ResponseEntity.ok(salvo);
    }

    private MoreIdeas converterParaEntidade(MoreIdeasDTO dto) {
        MoreIdeas m = new MoreIdeas();
        m.setNomeUsuario(dto.getNomeUsuario());
        m.setEmailUsuario(dto.getEmailUsuario());
        m.setSetor(dto.getSetor());
        m.setDescricaoProblema(dto.getDescricaoProblema());
        m.setPossiveisSolucoes(dto.getPossiveisSolucoes());
        m.setImpactos(dto.getImpactos());
        m.setInterferenciaAtividades(dto.getInterferenciaAtividades());
        m.setExpectativaMelhoria(dto.getExpectativaMelhoria());
        m.setSugestaoNomeKaizen(dto.getSugestaoNomeKaizen());
        return m;
    }
}
