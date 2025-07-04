package com.mouramateus.melhoria_continua.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.mouramateus.melhoria_continua.enums.StatusArea;
import jakarta.persistence.*;

@Entity
public class AuditedArea {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nomeArea;
    private Double seiri;
    private Double seiton;
    private Double seiso;
    private Double seiketsu;
    private Double shitsuke;
    private Double notaFinal;

    @Enumerated(EnumType.STRING)
    private StatusArea statusArea;

    public AuditedArea() {
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "audit_id")
    @JsonBackReference
    private Audit audit;

    public Audit getAudit() {
        return audit;
    }

    public void setAudit(Audit audit) {
        this.audit = audit;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeArea() {
        return nomeArea;
    }

    public void setNomeArea(String nomeArea) {
        this.nomeArea = nomeArea;
    }

    public Double getSeiri() {
        return seiri;
    }

    public void setSeiri(Double seiri) {
        this.seiri = seiri;
    }

    public Double getSeiton() {
        return seiton;
    }

    public void setSeiton(Double seiton) {
        this.seiton = seiton;
    }

    public Double getSeiso() {
        return seiso;
    }

    public void setSeiso(Double seiso) {
        this.seiso = seiso;
    }

    public Double getSeiketsu() {
        return seiketsu;
    }

    public void setSeiketsu(Double seiketsu) {
        this.seiketsu = seiketsu;
    }

    public Double getShitsuke() {
        return shitsuke;
    }

    public void setShitsuke(Double shitsuke) {
        this.shitsuke = shitsuke;
    }

    public Double getNotaFinal() {
        return notaFinal;
    }

    public void setNotaFinal(Double notaFinal) {
        this.notaFinal = notaFinal;
    }

    public StatusArea getStatusArea() {
        return statusArea;
    }

    public void setStatusArea(StatusArea statusArea) {
        this.statusArea = statusArea;
    }
}
