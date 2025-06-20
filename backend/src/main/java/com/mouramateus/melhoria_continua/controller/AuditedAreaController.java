package com.mouramateus.melhoria_continua.controller;

import com.mouramateus.melhoria_continua.dto.AuditedAreaDTO;
import com.mouramateus.melhoria_continua.services.AuditedAreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/audited-area")
@CrossOrigin(origins = "*")
public class AuditedAreaController {

    @Autowired
    private AuditedAreaService auditedAreaService;

    @PostMapping
    public AuditedAreaDTO criarAuditedArea(@RequestBody AuditedAreaDTO auditedAreaDTO) {
        return auditedAreaService.save(auditedAreaDTO);
    }

    @GetMapping
    public List<AuditedAreaDTO> listarAuditedAreas() {
        return auditedAreaService.findAll();
    }

    @GetMapping("/{id}")
    public AuditedAreaDTO buscarAuditedAreaPorId(@PathVariable Long id) {
        return auditedAreaService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void deletarAuditedAreaPorId(@PathVariable Long id) {
        auditedAreaService.delete(id);
    }
}
