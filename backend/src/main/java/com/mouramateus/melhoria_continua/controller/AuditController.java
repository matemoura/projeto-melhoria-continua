package com.mouramateus.melhoria_continua.controller;

import com.mouramateus.melhoria_continua.dto.AuditDTO;
import com.mouramateus.melhoria_continua.entities.Audit;
import com.mouramateus.melhoria_continua.entities.AuditedArea;
import com.mouramateus.melhoria_continua.entities.User;
import com.mouramateus.melhoria_continua.services.AuditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping("/criar")
    public ResponseEntity<Audit> criarAuditoria(
            @RequestPart("formulario") AuditDTO dto,
            @RequestPart(value = "imagem", required = false) MultipartFile imagem) {

        Audit auditoria = converterParaEntidade(dto);
        Audit salva = auditService.salvarComImagem(auditoria, imagem);
        return ResponseEntity.ok(salva);
    }

    private Audit converterParaEntidade(AuditDTO dto) {
        Audit entity = new Audit();
        entity.setAuditDateTime(dto.getDate());

        User auditor = auditService.buscarAuditorPorNome(dto.getAuditorNome());
        entity.setAuditor(auditor);

        List<AuditedArea> areas = dto.getAreasAuditadas().stream().map(areaDto -> {
            AuditedArea area = new AuditedArea();
            area.setNomeArea(areaDto.getNomeArea());
            area.setStatus(areaDto.getStatusArea());
            area.setNotaFinal(areaDto.getNotaFinal());
            area.setImages(areaDto.getImagens());
            area.setAudit(entity);
            return area;
        }).toList();

        entity.setAuditedAreas(areas);

        return entity;
    }
}
