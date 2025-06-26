package com.mouramateus.melhoria_continua.repositories;

import com.mouramateus.melhoria_continua.entities.MoreIdea;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MoreIdeaRepository extends JpaRepository<MoreIdea, Long> {

    List<MoreIdea> findByNomeUsuarioContainingIgnoreCase(String nomeUsuario);
}
