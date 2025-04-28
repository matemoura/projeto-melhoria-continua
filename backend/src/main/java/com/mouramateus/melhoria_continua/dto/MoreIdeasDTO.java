package com.mouramateus.melhoria_continua.dto;

import com.mouramateus.melhoria_continua.enums.ImpactProblem;
import lombok.Data;

import java.util.List;

@Data
public class MoreIdeasDTO {

    private Long id;
    private String nome;
    private String email;
    private String setor;
    private String problema;
    private String solucoes;
    private List<ImpactProblem> impactos;
    private String interferencia;
    private String expectativa;
    private String sugestaoNomeKaizen;
}
