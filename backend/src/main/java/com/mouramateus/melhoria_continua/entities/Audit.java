package com.mouramateus.melhoria_continua.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Audit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime auditDateTime;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User auditor;

    @OneToMany(mappedBy = "audit", cascade = CascadeType.ALL)
    private List<AuditedArea> auditedAreas;

    private String imagemPath;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getAuditDateTime() {
        return auditDateTime;
    }

    public void setAuditDateTime(LocalDateTime auditDateTime) {
        this.auditDateTime = auditDateTime;
    }

    public User getAuditor() {
        return auditor;
    }

    public void setAuditor(User auditor) {
        this.auditor = auditor;
    }

    public List<AuditedArea> getAuditedAreas() {
        return auditedAreas;
    }

    public void setAuditedAreas(List<AuditedArea> auditedAreas) {
        this.auditedAreas = auditedAreas;
    }

    public String getImagemPath() {
        return imagemPath;
    }

    public void setImagemPath(String imagemPath) {
        this.imagemPath = imagemPath;
    }
}
