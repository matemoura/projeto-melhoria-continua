package com.mouramateus.melhoria_continua.services;

import com.mouramateus.melhoria_continua.dto.AuditedAreaDTO;
import com.mouramateus.melhoria_continua.entities.AuditedArea;
import com.mouramateus.melhoria_continua.repositories.AuditedAreaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuditedAreaService {

    @Autowired
    private AuditedAreaRepository auditedAreaRepository;

    public AuditedArea toEntity(AuditedAreaDTO dto) {
        AuditedArea entity = new AuditedArea();
        if (dto.getId() != null) {
            entity.setId(dto.getId());
        }
        entity.setNomeArea(dto.getNomeArea());
        entity.setStatus(dto.getStatusArea());
        entity.setNotaFinal(dto.getNotaFinal());
        entity.setImages(dto.getImagens());

        return entity;
    }

    public AuditedAreaDTO toDTO(AuditedArea entity) {
        AuditedAreaDTO dto = new AuditedAreaDTO();
        dto.setId(entity.getId());
        dto.setNomeArea(entity.getNomeArea());
        dto.setStatusArea(entity.getStatus());
        dto.setNotaFinal(entity.getNotaFinal());
        dto.setImagens(entity.getImages());

        return dto;
    }

    public List<AuditedAreaDTO> findAll() {
        return auditedAreaRepository.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    public AuditedAreaDTO findById(Long id) {
        return auditedAreaRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Área auditada não encontrada com ID: " + id));
    }

    public AuditedAreaDTO save(AuditedAreaDTO dto) {
        AuditedArea entity = toEntity(dto);
        AuditedArea saved = auditedAreaRepository.save(entity);
        return toDTO(saved);
    }

    public AuditedAreaDTO update(Long id, AuditedAreaDTO dto) {
        Optional<AuditedArea> existingAreaOpt = auditedAreaRepository.findById(id);
        if (existingAreaOpt.isEmpty()) {
            throw new RuntimeException("Área auditada não encontrada com ID: " + id);
        }
        AuditedArea existingArea = existingAreaOpt.get();
        existingArea.setNomeArea(dto.getNomeArea());
        existingArea.setStatus(dto.getStatusArea());
        existingArea.setNotaFinal(dto.getNotaFinal());
        existingArea.setImages(dto.getImagens());

        AuditedArea updated = auditedAreaRepository.save(existingArea);
        return toDTO(updated);
    }

    public void delete(Long id) {
        if (!auditedAreaRepository.existsById(id)) {
            throw new RuntimeException("Área auditada não encontrada com ID: " + id);
        }
        auditedAreaRepository.deleteById(id);
    }
}
