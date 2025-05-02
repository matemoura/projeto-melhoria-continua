package com.mouramateus.melhoria_continua.entities;

import com.mouramateus.melhoria_continua.enums.ImpactProblem;
import com.mouramateus.melhoria_continua.enums.StatusIdea;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "tb_moreideas")
@Data
public class MoreIdeas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeUsuario;

    private String emailUsuario;

    private String setor;

    private String descricaoProblema;

    private String possiveisSolucoes;

    private String imagemPath;

    @ElementCollection(targetClass = ImpactProblem.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "tb_impactos_ideia", joinColumns = @JoinColumn(name = "tb_more_idea_id"))
    @Column(name = "impacto")
    private List<ImpactProblem> impactos;

    private String interferenciaAtividades;

    private String expectativaMelhoria;

    private String sugestaoNomeKaizen;

    private LocalDateTime dataHoraEnvio;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private StatusIdea status;
}
