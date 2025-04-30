package com.mouramateus.melhoria_continua.dto;

import lombok.Data;

@Data
public class SectorDTO {

    private Long id;
    private String name;

    public SectorDTO(Long id, String name) {
    }
}
