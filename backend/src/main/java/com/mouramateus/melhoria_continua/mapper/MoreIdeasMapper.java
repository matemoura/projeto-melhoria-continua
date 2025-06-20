package com.mouramateus.melhoria_continua.mapper;

import com.mouramateus.melhoria_continua.dto.MoreIdeasDTO;
import com.mouramateus.melhoria_continua.entities.MoreIdeas;

public class MoreIdeasMapper {

    public static MoreIdeasDTO toDTO(MoreIdeas entity) {
        MoreIdeasDTO dto = new MoreIdeasDTO();
        dto.setId(entity.getId());
        dto.setNomeUsuario(entity.getNomeUsuario());
        dto.setEmailUsuario(entity.getEmailUsuario());
        dto.setSetor(entity.getSetor());
        dto.setDescricaoProblema(entity.getDescricaoProblema());
        dto.setPossiveisSolucoes(entity.getPossiveisSolucoes());
        dto.setImpactos(entity.getImpactos());
        dto.setInterferenciaAtividades(entity.getInterferenciaAtividades());
        dto.setExpectativaMelhoria(entity.getExpectativaMelhoria());
        dto.setSugestaoNomeKaizen(entity.getSugestaoNomeKaizen());
        dto.setImagemPath(entity.getImagemPath());
        dto.setDataHoraEnvio(entity.getDataHoraEnvio());
        dto.setStatus(entity.getStatus());
        return dto;
    }

    public static MoreIdeas toEntity(MoreIdeasDTO dto) {
        MoreIdeas entity = new MoreIdeas();
        entity.setId(dto.getId());
        entity.setNomeUsuario(dto.getNomeUsuario());
        entity.setEmailUsuario(dto.getEmailUsuario());
        entity.setSetor(dto.getSetor());
        entity.setDescricaoProblema(dto.getDescricaoProblema());
        entity.setPossiveisSolucoes(dto.getPossiveisSolucoes());
        entity.setImpactos(dto.getImpactos());
        entity.setInterferenciaAtividades(dto.getInterferenciaAtividades());
        entity.setExpectativaMelhoria(dto.getExpectativaMelhoria());
        entity.setSugestaoNomeKaizen(dto.getSugestaoNomeKaizen());
        entity.setImagemPath(dto.getImagemPath());
        entity.setDataHoraEnvio(dto.getDataHoraEnvio());
        entity.setStatus(dto.getStatus());
        return entity;
    }
}
