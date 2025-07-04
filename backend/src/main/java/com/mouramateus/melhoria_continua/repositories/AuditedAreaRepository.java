package com.mouramateus.melhoria_continua.repositories;

import com.mouramateus.melhoria_continua.entities.AuditedArea;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuditedAreaRepository extends JpaRepository<AuditedArea, Long> {

        List<AuditedArea> findByNomeAreaOrderByAudit_AuditDateTimeDesc(String nomeArea);
}
