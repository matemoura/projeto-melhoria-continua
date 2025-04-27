package com.mouramateus.melhoria_continua.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "tb_questions5s")
@Data
public class Questions5S {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "texto", nullable = false)
    private String texto;

    @Column(name = "obrigatoria", nullable = false)
    private boolean obrigatoria;
}
