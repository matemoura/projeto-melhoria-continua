package com.mouramateus.melhoria_continua.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "tb_forms5s")
@Data
public class Form5S {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name ="name_user", nullable = false)
    private String nomeUsuario;

    @Column(name = "email_user", nullable = false)
    private String emailUsuario;

    @Column(name = "sector", nullable = false)
    private String setor;

    @Column(name = "date_shipping", nullable = false)
    private LocalDateTime dataEnvio;

    @Column(name = "status", nullable = false)
    private String status;

    @OneToMany
    private List<Questions5S> answeredQuestions;

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

    public LocalDateTime getDataEnvio() {
        return dataEnvio;
    }

    public void setDataEnvio(LocalDateTime dataEnvio) {
        this.dataEnvio = dataEnvio;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Questions5S> getAnsweredQuestions() {
        return answeredQuestions;
    }

    public void setAnsweredQuestions(List<Questions5S> answeredQuestions) {
        this.answeredQuestions = answeredQuestions;
    }
}
