package com.mouramateus.melhoria_continua.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditDTO {

    private Long id;
    private LocalDateTime auditDateTime;
    private String auditor;
    private List<AuditedAreaDTO> auditedAreas;
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

    public String getAuditor() {
        return auditor;
    }

    public void setAuditor(String auditor) {
        this.auditor = auditor;
    }

    public List<AuditedAreaDTO> getAuditedAreas() {
        return auditedAreas;
    }

    public void setAuditedAreas(List<AuditedAreaDTO> auditedAreas) {
        this.auditedAreas = auditedAreas;
    }

    public String getImagemPath() {
        return imagemPath;
    }

    public void setImagemPath(String imagemPath) {
        this.imagemPath = imagemPath;
    }
}
