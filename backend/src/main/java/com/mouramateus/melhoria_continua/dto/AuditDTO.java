package com.mouramateus.melhoria_continua.dto;

import com.mouramateus.melhoria_continua.entities.AuditedAreaDTO;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AuditDTO {

    private Long id;
    private LocalDateTime date;
    private String auditorNome;
    private List<AuditedAreaDTO> areasauditadas;
}
