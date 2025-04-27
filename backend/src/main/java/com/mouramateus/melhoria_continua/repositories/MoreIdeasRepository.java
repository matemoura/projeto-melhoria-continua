package com.mouramateus.melhoria_continua.repositories;

import com.mouramateus.melhoria_continua.entities.MoreIdeas;
import com.mouramateus.melhoria_continua.enums.StatusIdea;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MoreIdeasRepository extends JpaRepository<MoreIdeas, Long> {

    List<MoreIdeas> findByEmailUsuario(String email);

    List<MoreIdeas> findByStatus(StatusIdea status);

    List<MoreIdeas> findByEmailUsuarioAndStatus(String email, String status);
}
