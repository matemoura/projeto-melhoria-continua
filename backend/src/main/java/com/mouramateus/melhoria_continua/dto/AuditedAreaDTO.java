package com.mouramateus.melhoria_continua.dto;

import com.mouramateus.melhoria_continua.enums.StatusArea;
import lombok.Data;

import java.util.List;

@Data
public class AuditedAreaDTO {

    private Long id;
    private String nomeArea;
    private StatusArea statusArea;
    private List<String> imagens;
    private Double notaFinal;
}
