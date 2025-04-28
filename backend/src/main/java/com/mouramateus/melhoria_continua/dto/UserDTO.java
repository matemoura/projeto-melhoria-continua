package com.mouramateus.melhoria_continua.dto;

import com.mouramateus.melhoria_continua.enums.Profile;
import lombok.Data;

@Data
public class UserDTO {

    private Long id;
    private String nome;
    private String email;
    private Profile profile;
    private String setorNome;
}
