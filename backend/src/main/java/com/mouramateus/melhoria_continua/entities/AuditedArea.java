package com.mouramateus.melhoria_continua.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class AuditedArea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeArea;

    @Enumerated(EnumType.STRING)
    private StatusArea status;

    @ManyToOne
    @JoinColumn(name = "id_audit")
    private Audit audit;

    @ElementCollection
    private List<String> images;

    private Double notaFinal;
}
