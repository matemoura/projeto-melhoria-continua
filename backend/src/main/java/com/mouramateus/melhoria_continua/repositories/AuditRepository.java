package com.mouramateus.melhoria_continua.repositories;

import com.mouramateus.melhoria_continua.entities.Audit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuditRepository extends JpaRepository<Audit, Long> {
}