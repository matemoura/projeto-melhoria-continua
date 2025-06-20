package com.mouramateus.melhoria_continua.entities;

import com.mouramateus.melhoria_continua.enums.ImpactProblem;
import com.mouramateus.melhoria_continua.enums.StatusIdea;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;


@Entity
@Table(name = "tb_moreideas")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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

    @Column(columnDefinition = "TEXT")
    private String expectativaMelhoria;

    private String sugestaoNomeKaizen;

    @Column(nullable = false)
    private LocalDateTime dataHoraEnvio;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusIdea status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeUsuario() {
        return nomeUsuario;
    }

    public void setNomeUsuario(String nomeUsuario) {
        this.nomeUsuario = nomeUsuario;
    }

    public String getEmailUsuario() {
        return emailUsuario;
    }

    public void setEmailUsuario(String emailUsuario) {
        this.emailUsuario = emailUsuario;
    }

    public String getSetor() {
        return setor;
    }

    public void setSetor(String setor) {
        this.setor = setor;
    }

    public String getDescricaoProblema() {
        return descricaoProblema;
    }

    public void setDescricaoProblema(String descricaoProblema) {
        this.descricaoProblema = descricaoProblema;
    }

    public String getPossiveisSolucoes() {
        return possiveisSolucoes;
    }

    public void setPossiveisSolucoes(String possiveisSolucoes) {
        this.possiveisSolucoes = possiveisSolucoes;
    }

    public String getImagemPath() {
        return imagemPath;
    }

    public void setImagemPath(String imagemPath) {
        this.imagemPath = imagemPath;
    }

    public List<ImpactProblem> getImpactos() {
        return impactos;
    }

    public void setImpactos(List<ImpactProblem> impactos) {
        this.impactos = impactos;
    }

    public String getInterferenciaAtividades() {
        return interferenciaAtividades;
    }

    public void setInterferenciaAtividades(String interferenciaAtividades) {
        this.interferenciaAtividades = interferenciaAtividades;
    }

    public String getExpectativaMelhoria() {
        return expectativaMelhoria;
    }

    public void setExpectativaMelhoria(String expectativaMelhoria) {
        this.expectativaMelhoria = expectativaMelhoria;
    }

    public String getSugestaoNomeKaizen() {
        return sugestaoNomeKaizen;
    }

    public void setSugestaoNomeKaizen(String sugestaoNomeKaizen) {
        this.sugestaoNomeKaizen = sugestaoNomeKaizen;
    }

    public LocalDateTime getDataHoraEnvio() {
        return dataHoraEnvio;
    }

    public void setDataHoraEnvio(LocalDateTime dataHoraEnvio) {
        this.dataHoraEnvio = dataHoraEnvio;
    }

    public StatusIdea getStatus() {
        return status;
    }

    public void setStatus(StatusIdea status) {
        this.status = status;
    }
}
