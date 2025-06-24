package com.mouramateus.melhoria_continua.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginResponse {
    private String token;
    private String name;
    private String profile;
    private Long id;

    public LoginResponse(String token, String name, String profile, Long id) {
        this.token = token;
        this.name = name;
        this.profile = profile;
        this.id = id;
    }
}
