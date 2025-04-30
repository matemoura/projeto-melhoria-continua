package com.mouramateus.melhoria_continua.services;

import com.mouramateus.melhoria_continua.dto.MoreIdeasDTO;
import com.mouramateus.melhoria_continua.entities.MoreIdeas;
import com.mouramateus.melhoria_continua.enums.ImpactProblem;
import com.mouramateus.melhoria_continua.repositories.MoreIdeasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MoreIdeasService {

    @Autowired
    private MoreIdeasRepository moreIdeasRepository;

    public List<MoreIdeasDTO> findAll() {
        return moreIdeasRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public MoreIdeasDTO findById(Long id) {
        return moreIdeasRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Ideia não encontrada"));
    }

    public MoreIdeasDTO save(MoreIdeasDTO dto) {
        MoreIdeas entity = toEntity(dto);
        return toDTO(moreIdeasRepository.save(entity));
    }

    public void delete(Long id) {
        moreIdeasRepository.deleteById(id);
    }

    private MoreIdeasDTO toDTO(MoreIdeas entity) {
        MoreIdeasDTO dto = new MoreIdeasDTO();
        dto.setId(entity.getId());
        dto.setNomeUsuario(entity.getNomeUsuario());
        dto.setEmailUsuario(entity.getEmailUsuario());
        dto.setSetor(entity.getSetor());
        dto.setDescricaoProblema(entity.getDescricaoProblema());
        dto.setPossiveisSolucoes(entity.getPossiveisSolucoes());

        dto.setImpactos(
                entity.getImpactos().stream()
                        .map(ImpactProblem::valueOf)
                        .collect(Collectors.toList())
        );

        dto.setInterferenciaAtividades(entity.getInterferenciaAtividades());
        dto.setExpectativaMelhoria(entity.getExpectativaMelhoria());
        dto.setSugestaoNomeKaizen(entity.getSugestaoNomeKaizen());
        return dto;
    }


    private MoreIdeas toEntity(MoreIdeasDTO dto) {
        MoreIdeas entity = new MoreIdeas();
        entity.setId(dto.getId());
        entity.setNomeUsuario(dto.getNomeUsuario());
        entity.setEmailUsuario(dto.getEmailUsuario());
        entity.setSetor(dto.getSetor());
        entity.setDescricaoProblema(dto.getDescricaoProblema());
        entity.setPossiveisSolucoes(dto.getPossiveisSolucoes());

        entity.setImpactos(
                dto.getImpactos().stream()
                        .map(Enum::name)
                        .collect(Collectors.toList())
        );

        entity.setInterferenciaAtividades(dto.getInterferenciaAtividades());
        entity.setExpectativaMelhoria(dto.getExpectativaMelhoria());
        entity.setSugestaoNomeKaizen(dto.getSugestaoNomeKaizen());
        return entity;
    }
}
