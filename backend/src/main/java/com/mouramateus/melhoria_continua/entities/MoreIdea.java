package com.mouramateus.melhoria_continua.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class MoreIdea {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nomeUsuario;
    private String emailUsuario;
    private String setor;
    private String descricaoProblema;
    private String possiveisSolucoes;

    @ElementCollection
    private List<String> impactos;
    private Integer interference;
    private Integer expectedImprovement;
    private String kaizenNameSuggestion;
    private String imageUrl;

    public MoreIdea() {
    }

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

    public List<String> getImpactos() {
        return impactos;
    }

    public void setImpactos(List<String> impactos) {
        this.impactos = impactos;
    }

    public Integer getInterference() {
        return interference;
    }

    public void setInterference(Integer interference) {
        this.interference = interference;
    }

    public Integer getExpectedImprovement() {
        return expectedImprovement;
    }

    public void setExpectedImprovement(Integer expectedImprovement) {
        this.expectedImprovement = expectedImprovement;
    }

    public String getKaizenNameSuggestion() {
        return kaizenNameSuggestion;
    }

    public void setKaizenNameSuggestion(String kaizenNameSuggestion) {
        this.kaizenNameSuggestion = kaizenNameSuggestion;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
