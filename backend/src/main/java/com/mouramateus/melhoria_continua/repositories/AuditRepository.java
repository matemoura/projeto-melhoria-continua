package com.mouramateus.melhoria_continua.repositories;

import com.mouramateus.melhoria_continua.entities.Audit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AuditRepository extends JpaRepository<Audit, Long> {

    @Query("SELECT DISTINCT a.nomeArea FROM AuditedArea a ORDER BY a.nomeArea")
    List<String> findDistinctAreaNames();

    List<Audit> findByAuditedAreasNomeArea(String nomeArea);
}