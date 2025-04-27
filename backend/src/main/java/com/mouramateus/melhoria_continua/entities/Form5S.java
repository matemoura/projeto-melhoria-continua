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
}
