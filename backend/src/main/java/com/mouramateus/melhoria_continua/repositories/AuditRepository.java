package com.mouramateus.melhoria_continua.repositories;

import com.mouramateus.melhoria_continua.entities.Audit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuditRepository extends JpaRepository<Audit, Long> {

    Optional<Audit> findTopByOrderByAuditDateTimeDesc();
}
