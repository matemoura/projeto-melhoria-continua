package com.mouramateus.melhoria_continua.repositories;

import com.mouramateus.melhoria_continua.entities.MoreIdea;
import com.mouramateus.melhoria_continua.enums.StatusIdea;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MoreIdeaRepository extends JpaRepository<MoreIdea, Long> {

    List<MoreIdea> findByNomeUsuarioContainingIgnoreCase(String nomeUsuario);

    List<MoreIdea> findByStatusAndNomeUsuarioContainingIgnoreCase(StatusIdea status, String nomeUsuario);

    List<MoreIdea> findByStatus(StatusIdea status);
}
