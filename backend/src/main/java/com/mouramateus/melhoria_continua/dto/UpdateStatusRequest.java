package com.mouramateus.melhoria_continua.dto;

import com.mouramateus.melhoria_continua.enums.StatusIdea;

public class UpdateStatusRequest {

    private StatusIdea status;

    public StatusIdea getStatus() {
        return status;
    }

    public void setStatus(StatusIdea status) {
        this.status = status;
    }
}
