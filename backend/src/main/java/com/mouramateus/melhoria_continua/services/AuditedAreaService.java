package com.mouramateus.melhoria_continua.services;

import com.mouramateus.melhoria_continua.dto.AuditedAreaDTO;
import com.mouramateus.melhoria_continua.entities.AuditedArea;
import com.mouramateus.melhoria_continua.repositories.AuditedAreaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AuditedAreaService {

    @Autowired
    private AuditedAreaRepository auditedAreaRepository;

    public List<AuditedAreaDTO> findAll() {
        return auditedAreaRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public AuditedAreaDTO findById(Long id) {
        Optional<AuditedArea> entityOpt = auditedAreaRepository.findById(id);
        return entityOpt.map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Área auditada não encontrada"));
    }

    public AuditedAreaDTO save(AuditedAreaDTO dto) {
        AuditedArea entity = toEntity(dto);
        AuditedArea saved = auditedAreaRepository.save(entity);
        return toDTO(saved);
    }

    public void deleteById(Long id) {
        auditedAreaRepository.deleteById(id);
    }

    private AuditedAreaDTO toDTO(AuditedArea entity) {
        AuditedAreaDTO dto = new AuditedAreaDTO();
        dto.setId(entity.getId());
        dto.setNomeArea(entity.getNomeArea());
        dto.setStatusArea(entity.getStatus());
        dto.setImagens(entity.getImages());
        dto.setNotaFinal(entity.getNotaFinal());
        return dto;
    }

    private AuditedArea toEntity(AuditedAreaDTO dto) {
        AuditedArea entity = new AuditedArea();
        entity.setId(dto.getId());
        entity.setNomeArea(dto.getNomeArea());
        entity.setStatus(dto.getStatusArea());
        entity.setImages(dto.getImagens());
        entity.setNotaFinal(dto.getNotaFinal());
        return entity;
    }
}
