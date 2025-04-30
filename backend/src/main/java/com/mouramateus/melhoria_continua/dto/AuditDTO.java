package com.mouramateus.melhoria_continua.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class AuditDTO {

    private Long id;
    private LocalDateTime date;
    private String auditorNome;
    private List<AuditedAreaDTO> areasAuditadas;
}
