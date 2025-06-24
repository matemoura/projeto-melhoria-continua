package com.mouramateus.melhoria_continua.services;

import com.mouramateus.melhoria_continua.dto.AuditDTO;
import com.mouramateus.melhoria_continua.dto.AuditedAreaDTO;
import com.mouramateus.melhoria_continua.entities.Audit;
import com.mouramateus.melhoria_continua.entities.AuditedArea;
import com.mouramateus.melhoria_continua.entities.User;
import com.mouramateus.melhoria_continua.enums.StatusArea;
import com.mouramateus.melhoria_continua.repositories.AuditRepository;
import com.mouramateus.melhoria_continua.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuditService {

    @Autowired
    private AuditRepository auditRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuditedAreaService auditedAreaService;

    private Audit toEntity(AuditDTO dto) {
        Audit entity = new Audit();
        if (dto.getId() != null) {
            entity.setId(dto.getId());
        }
        entity.setAuditDateTime(dto.getAuditDateTime());

        User auditor = userRepository.findByName(dto.getAuditor())
                .orElseThrow(() -> new RuntimeException("Auditor não encontrado com nome: " + dto.getAuditor()));
        entity.setAuditor(auditor);

        if (dto.getAuditedAreas() != null) {
            List<AuditedArea> areas = dto.getAuditedAreas().stream()
                    .map(auditedAreaService::toEntity)
                    .toList();
            areas.forEach(area -> area.setAudit(entity));
            entity.setAuditedAreas(areas);
        }

        return entity;
    }

    private AuditDTO toDTO(Audit entity) {
        AuditDTO dto = new AuditDTO();
        dto.setId(entity.getId());
        dto.setAuditDateTime(entity.getAuditDateTime());
        dto.setAuditor(entity.getAuditor() != null ? entity.getAuditor().getName() : null);
        if (entity.getAuditedAreas() != null) {
            List<AuditedAreaDTO> areasDTO = entity.getAuditedAreas().stream()
                    .map(auditedAreaService::toDTO)
                    .toList();
            dto.setAuditedAreas(areasDTO);
        }

        return dto;
    }

    public List<AuditDTO> findAll() {
        return auditRepository.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    public AuditDTO findById(Long id) {
        return auditRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Auditoria não encontrada com ID: " + id));
    }

    public AuditDTO save(AuditDTO dto, MultipartFile imagem) {
        Audit entity = toEntity(dto);

        if (entity.getAuditedAreas() != null) {
            entity.getAuditedAreas().forEach(area -> area.setStatus(StatusArea.PENDENTE));
        }

        if (imagem != null && !imagem.isEmpty()) {
            String imagePath = saveImage(imagem, "auditorias");
            entity.setImagemPath(imagePath);
        }

        Audit saved = auditRepository.save(entity);
        return toDTO(saved);
    }

    public AuditDTO save(AuditDTO dto) {
        Audit entity = toEntity(dto);

        if (entity.getAuditedAreas() != null) {
            entity.getAuditedAreas().forEach(area -> area.setStatus(StatusArea.PENDENTE));
        }

        Audit saved = auditRepository.save(entity);
        return toDTO(saved);
    }

    public AuditDTO update(Long id, AuditDTO dto, MultipartFile imagem) {
        Optional<Audit> existingAuditOpt = auditRepository.findById(id);
        if (existingAuditOpt.isEmpty()) {
            throw new RuntimeException("Auditoria não encontrada com ID: " + id);
        }

        Audit existingAudit = existingAuditOpt.get();
        existingAudit.setAuditDateTime(dto.getAuditDateTime());

        User auditor = userRepository.findByName(dto.getAuditor())
                .orElseThrow(() -> new RuntimeException("Auditor não encontrado com nome: " + dto.getAuditor()));
        existingAudit.setAuditor(auditor);

        if (dto.getAuditedAreas() != null) {
            List<AuditedArea> updatedAreas = dto.getAuditedAreas().stream()
                    .map(auditedAreaService::toEntity)
                    .toList();
            updatedAreas.forEach(area -> area.setAudit(existingAudit));
            existingAudit.setAuditedAreas(updatedAreas);
        } else {
            existingAudit.setAuditedAreas(null);
        }

        if (imagem != null && !imagem.isEmpty()) {
            String imagePath = saveImage(imagem, "auditorias");
            existingAudit.setImagemPath(imagePath);
        } else if (dto.getImagemPath() == null || dto.getImagemPath().isEmpty()) {
            existingAudit.setImagemPath(null);
        }

        Audit updated = auditRepository.save(existingAudit);
        return toDTO(updated);
    }

    public void delete(Long id) {
        if (!auditRepository.existsById(id)) {
            throw new RuntimeException("Auditoria não encontrada com ID: " + id);
        }
        auditRepository.deleteById(id);
    }

    private String saveImage(MultipartFile file, String folder) {
        try {
            Path directory = Paths.get("uploads/" + folder);
            if (!Files.exists(directory)) {
                Files.createDirectories(directory);
            }
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path filePath = directory.resolve(fileName);
            Files.copy(file.getInputStream(), filePath);
            return "/uploads/" + folder + "/" + fileName;
        } catch (IOException e) {
            throw new RuntimeException("Erro ao salvar imagem: " + e.getMessage());
        }
    }

    public AuditDTO approveAudit(Long id) {
        Audit audit = auditRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Auditoria não encontrada com ID: " + id));

        if (audit.getAuditedAreas() != null) {
            audit.getAuditedAreas().forEach(area -> area.setStatus(StatusArea.CONCLUIDO));
        }

        Audit updated = auditRepository.save(audit);
        return toDTO(updated);
    }
}
