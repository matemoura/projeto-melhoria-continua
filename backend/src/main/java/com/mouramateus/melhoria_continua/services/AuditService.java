package com.mouramateus.melhoria_continua.services;

import com.mouramateus.melhoria_continua.dto.AuditDTO;
import com.mouramateus.melhoria_continua.dto.AuditedAreaDTO;
import com.mouramateus.melhoria_continua.entities.Audit;
import com.mouramateus.melhoria_continua.entities.AuditedArea;
import com.mouramateus.melhoria_continua.entities.User;
import com.mouramateus.melhoria_continua.repositories.AuditRepository;
import com.mouramateus.melhoria_continua.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuditService {

    @Autowired
    private AuditRepository auditRepository;

    @Autowired
    private UserRepository userRepository;

    public List<AuditDTO> findAll() {
        return auditRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public AuditDTO findById(Long id) {
        return auditRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Auditoria não encontrada"));
    }

    public AuditDTO save(AuditDTO dto) {
        Audit entity = new Audit();
        entity.setAuditDateTime(dto.getDate());

        User auditor = userRepository.findByNome(dto.getAuditorNome())
                .orElseThrow(() -> new RuntimeException("Auditor não encontrado"));

        entity.setAuditor(auditor);

        List<AuditedArea> areas = dto.getAreasAuditadas().stream().map(areaDto -> {
            AuditedArea area = new AuditedArea();
            area.setNomeArea(areaDto.getNomeArea());
            area.setStatus(areaDto.getStatusArea());
            area.setNotaFinal(areaDto.getNotaFinal());
            area.setImages(areaDto.getImagens());
            area.setAudit(entity);
            return area;
        }).collect(Collectors.toList());

        entity.setAuditedAreas(areas);

        Audit saved = auditRepository.save(entity);
        return toDTO(saved);
    }

    public void deleteById(Long id) {
        auditRepository.deleteById(id);
    }

    private AuditDTO toDTO(Audit entity) {
        AuditDTO dto = new AuditDTO();
        dto.setId(entity.getId());
        dto.setDate(entity.getAuditDateTime());
        dto.setAuditorNome(entity.getAuditor().getName());

        List<AuditedAreaDTO> areasDTO = entity.getAuditedAreas().stream().map(area -> {
            AuditedAreaDTO areaDTO = new AuditedAreaDTO();
            areaDTO.setId(area.getId());
            areaDTO.setNomeArea(area.getNomeArea());
            areaDTO.setStatusArea(area.getStatus());
            areaDTO.setNotaFinal(area.getNotaFinal());
            areaDTO.setImagens(area.getImages());
            return areaDTO;
        }).collect(Collectors.toList());

        dto.setAreasAuditadas(areasDTO);
        return dto;
    }
}
