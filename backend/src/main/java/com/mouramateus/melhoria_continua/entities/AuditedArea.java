package com.mouramateus.melhoria_continua.entities;

import com.mouramateus.melhoria_continua.enums.StatusArea;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
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

    public StatusArea getStatus() {
        return status;
    }

    public void setStatus(StatusArea status) {
        this.status = status;
    }

    public Audit getAudit() {
        return audit;
    }

    public void setAudit(Audit audit) {
        this.audit = audit;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public Double getNotaFinal() {
        return notaFinal;
    }

    public void setNotaFinal(Double notaFinal) {
        this.notaFinal = notaFinal;
    }
}
