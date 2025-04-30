package com.mouramateus.melhoria_continua.dto;

import com.mouramateus.melhoria_continua.enums.ImpactProblem;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class MoreIdeasDTO {

    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    private String nomeUsuario;

    @NotBlank(message = "E-mail é obrigatório")
    @Email(message = "E-mail inválido")
    private String emailUsuario;

    @NotBlank(message = "Setor é obrigatório")
    private String setor;

    @NotBlank(message = "Problema é obrigatório")
    private String descricaoProblema;

    private String possiveisSolucoes;

    @NotNull(message = "Impactos devem ser informados")
    private List<ImpactProblem> impactos;

    private String interferenciaAtividades;
    private String expectativaMelhoria;
    private String sugestaoNomeKaizen;
}
