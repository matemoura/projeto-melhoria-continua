package com.mouramateus.melhoria_continua.dto;

public class UpdateMoreIdeaDto {

    private String status;
    private String kaizenName;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getKaizenName() {
        return kaizenName;
    }

    public void setKaizenName(String kaizenName) {
        this.kaizenName = kaizenName;
    }
}
