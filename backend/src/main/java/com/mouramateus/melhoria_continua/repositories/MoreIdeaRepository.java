package com.mouramateus.melhoria_continua.repositories;

import com.mouramateus.melhoria_continua.entities.MoreIdea;
import com.mouramateus.melhoria_continua.enums.StatusIdea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MoreIdeaRepository extends JpaRepository<MoreIdea, Long> {

    List<MoreIdea> findByNomeUsuarioContainingIgnoreCase(String nomeUsuario);

    List<MoreIdea> findByStatusAndNomeUsuarioContainingIgnoreCase(StatusIdea status, String nomeUsuario);

    List<MoreIdea> findByStatus(StatusIdea status);

    @Query("SELECT m FROM MoreIdea m WHERE " +
            "LOWER(m.nomeUsuario) LIKE LOWER(CONCAT('%', :term, '%')) OR " +
            "LOWER(m.kaizenNameSuggestion) LIKE LOWER(CONCAT('%', :term, '%')) OR " +
            "LOWER(m.kaizenName) LIKE LOWER(CONCAT('%', :term, '%'))")
    List<MoreIdea> findByTermo(@Param("term") String term);

    @Query("SELECT m FROM MoreIdea m WHERE m.status = :status AND (" +
            "LOWER(m.nomeUsuario) LIKE LOWER(CONCAT('%', :term, '%')) OR " +
            "LOWER(m.kaizenNameSuggestion) LIKE LOWER(CONCAT('%', :term, '%')) OR " +
            "LOWER(m.kaizenName) LIKE LOWER(CONCAT('%', :term, '%')))")
    List<MoreIdea> findByStatusAndTermo(@Param("status") StatusIdea status, @Param("term") String term);
}
