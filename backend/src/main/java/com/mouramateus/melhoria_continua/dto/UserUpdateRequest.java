package com.mouramateus.melhoria_continua.dto;

public class UserUpdateRequest {

    private String profile;
    private Long setorId;

    public String getProfile() {
        return profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public Long getSetorId() {
        return setorId;
    }

    public void setSetorId(Long setorId) {
        this.setorId = setorId;
    }
}
