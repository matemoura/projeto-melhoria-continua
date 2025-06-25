package com.mouramateus.melhoria_continua.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Audit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String auditor;
    private LocalDateTime auditDateTime;
    private String imageUrl;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "audit_id")
    private List<AuditedArea> auditedAreas;

    public Audit() {
    }

    public Audit(String auditor, LocalDateTime auditDateTime, String imageUrl) {
        this.auditor = auditor;
        this.auditDateTime = auditDateTime;
        this.imageUrl = imageUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAuditor() {
        return auditor;
    }

    public void setAuditor(String auditor) {
        this.auditor = auditor;
    }

    public LocalDateTime getAuditDateTime() {
        return auditDateTime;
    }

    public void setAuditDateTime(LocalDateTime auditDateTime) {
        this.auditDateTime = auditDateTime;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<AuditedArea> getAuditedAreas() {
        return auditedAreas;
    }

    public void setAuditedAreas(List<AuditedArea> auditedAreas) {
        this.auditedAreas = auditedAreas;
    }
}
