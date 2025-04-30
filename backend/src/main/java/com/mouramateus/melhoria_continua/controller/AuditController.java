package com.mouramateus.melhoria_continua.controller;

import com.mouramateus.melhoria_continua.dto.AuditDTO;
import com.mouramateus.melhoria_continua.services.AuditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/audit")
@CrossOrigin(origins = "*")
public class AuditController {

    @Autowired
    private AuditService auditService;

    @PostMapping
    public AuditDTO criarAudit(@RequestBody AuditDTO dto) {
        return auditService.save(dto);
    }

    @GetMapping
    public List<AuditDTO> listarAudit() {
        return auditService.findAll();
    }

    @GetMapping("/{id}")
    public AuditDTO buscarAuditPorId(@PathVariable Long id) {
        return auditService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void removerAudit(@PathVariable Long id) {
        auditService.deleteById(id);
    }
}
