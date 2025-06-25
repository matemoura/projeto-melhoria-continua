package com.mouramateus.melhoria_continua.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mouramateus.melhoria_continua.entities.Audit;
import com.mouramateus.melhoria_continua.services.AuditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/audit")
@CrossOrigin(origins = "http://localhost:4200")
public class AuditController {

    @Autowired
    private AuditService auditService;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping("/criar")
    public ResponseEntity<Audit> createAudit(
            @RequestParam("formulario") String auditJson,
            @RequestParam(value = "imagem", required = false) MultipartFile imageFile) throws IOException {

        Audit audit = objectMapper.readValue(auditJson, Audit.class);

        if (audit.getAuditDateTime() == null) {
            audit.setAuditDateTime(LocalDateTime.now());
        }

        Audit savedAudit = auditService.submitAudit(audit, imageFile);
        return ResponseEntity.ok(savedAudit);
    }

    @GetMapping("/ranking/total")
    public ResponseEntity<List<Map<String, Object>>> getTotalRanking() {
        List<Map<String, Object>> ranking = auditService.getTotalRanking();
        return ResponseEntity.ok(ranking);
    }

    @GetMapping("/ranking/latest")
    public ResponseEntity<List<Map<String, Object>>> getLatestAuditRanking() {
        List<Map<String, Object>> ranking = auditService.getLatestAuditRanking();
        return ResponseEntity.ok(ranking);
    }
}
