package com.mouramateus.melhoria_continua.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mouramateus.melhoria_continua.dto.UpdateStatusRequest;
import com.mouramateus.melhoria_continua.entities.MoreIdea;
import com.mouramateus.melhoria_continua.enums.StatusIdea;
import com.mouramateus.melhoria_continua.services.MoreIdeaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/more-ideas")
@CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PATCH, RequestMethod.PUT, RequestMethod.DELETE})
public class MoreIdeasController {

    @Autowired
    private MoreIdeaService moreIdeaService;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping
    public ResponseEntity<List<MoreIdea>> getAllIdeas(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) StatusIdea status) {
        List<MoreIdea> ideas = moreIdeaService.getAllIdeas(name, status);
        return ResponseEntity.ok(ideas);
    }

    @PostMapping
    public ResponseEntity<MoreIdea> submitIdea(
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("department") String department,
            @RequestParam("problemDescription") String problemDescription,
            @RequestParam("possibleSolutions") String possibleSolutions,
            @RequestParam("impacts") String impacts,
            @RequestParam("interference") Integer interference,
            @RequestParam("expectedImprovement") Integer expectedImprovement,
            @RequestParam(value = "kaizenNameSuggestion", required = false) String kaizenNameSuggestion,
            @RequestParam(value = "image", required = false) MultipartFile imageFile) throws IOException {

        MoreIdea idea = new MoreIdea();
        idea.setNomeUsuario(name);
        idea.setEmailUsuario(email);
        idea.setSetor(department);
        idea.setDescricaoProblema(problemDescription);
        idea.setPossiveisSolucoes(possibleSolutions);
        idea.setImpactos(List.of(impacts.split(",")));
        idea.setInterference(interference);
        idea.setExpectedImprovement(expectedImprovement);
        idea.setKaizenNameSuggestion(kaizenNameSuggestion);
        idea.setStatus(StatusIdea.PENDENTE);

        MoreIdea savedIdea = moreIdeaService.submitIdea(idea, imageFile);
        return ResponseEntity.ok(savedIdea);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<MoreIdea> updateIdeaStatus(
            @PathVariable Long id,
            @RequestBody UpdateStatusRequest request) {
        MoreIdea updatedIdea = moreIdeaService.updateStatus(id, request.getStatus());
        return ResponseEntity.ok(updatedIdea);
    }
}
