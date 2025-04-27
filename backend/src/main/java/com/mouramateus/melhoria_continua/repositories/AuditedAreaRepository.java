package com.mouramateus.melhoria_continua.repositories;

import com.mouramateus.melhoria_continua.entities.AuditedArea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuditedAreaRepository extends JpaRepository<AuditedArea, Long> {
}
