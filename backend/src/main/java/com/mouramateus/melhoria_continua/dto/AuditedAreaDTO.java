package com.mouramateus.melhoria_continua.dto;

import com.mouramateus.melhoria_continua.enums.StatusArea;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditedAreaDTO {

    private Long id;
    private String nomeArea;
    private StatusArea statusArea;
    private List<String> imagens;
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

    public StatusArea getStatusArea() {
        return statusArea;
    }

    public void setStatusArea(StatusArea statusArea) {
        this.statusArea = statusArea;
    }

    public List<String> getImagens() {
        return imagens;
    }

    public void setImagens(List<String> imagens) {
        this.imagens = imagens;
    }

    public Double getNotaFinal() {
        return notaFinal;
    }

    public void setNotaFinal(Double notaFinal) {
        this.notaFinal = notaFinal;
    }
}
