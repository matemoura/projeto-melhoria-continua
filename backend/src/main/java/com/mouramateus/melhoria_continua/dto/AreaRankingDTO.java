package com.mouramateus.melhoria_continua.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AreaRankingDTO {

    private String nomeArea;
    private Double pontuacao;

    public AreaRankingDTO(String nomeArea, Double pontuacao) {
        this.nomeArea = nomeArea;
        this.pontuacao = pontuacao;
    }

    public String getNomeArea() {
        return nomeArea;
    }
    public void setNomeArea(String nomeArea) {
        this.nomeArea = nomeArea;
    }
    public Double getPontuacao() {
        return pontuacao;
    }
    public void setPontuacao(Double pontuacao) {
        this.pontuacao = pontuacao;
    }
}
