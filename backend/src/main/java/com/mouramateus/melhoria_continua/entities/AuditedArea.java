package com.mouramateus.melhoria_continua.entities;

import com.mouramateus.melhoria_continua.enums.StatusArea;
import jakarta.persistence.*;

@Entity
public class AuditedArea {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nomeArea;
    private Integer seiri;
    private Integer seiton;
    private Integer seiso;
    private Integer seiketsu;
    private Integer shitsuke;
    private Integer notaFinal;

    @Enumerated(EnumType.STRING)
    private StatusArea statusArea;

    public AuditedArea() {
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

    public Integer getSeiri() {
        return seiri;
    }

    public void setSeiri(Integer seiri) {
        this.seiri = seiri;
    }

    public Integer getSeiton() {
        return seiton;
    }

    public void setSeiton(Integer seiton) {
        this.seiton = seiton;
    }

    public Integer getSeiso() {
        return seiso;
    }

    public void setSeiso(Integer seiso) {
        this.seiso = seiso;
    }

    public Integer getShitsuke() {
        return shitsuke;
    }

    public void setShitsuke(Integer shitsuke) {
        this.shitsuke = shitsuke;
    }

    public Integer getNotaFinal() {
        return notaFinal;
    }

    public void setNotaFinal(Integer notaFinal) {
        this.notaFinal = notaFinal;
    }

    public StatusArea getStatusArea() {
        return statusArea;
    }

    public void setStatusArea(StatusArea statusArea) {
        this.statusArea = statusArea;
    }
}
