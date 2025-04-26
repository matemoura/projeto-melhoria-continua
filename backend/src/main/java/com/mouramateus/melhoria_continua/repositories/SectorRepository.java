package com.mouramateus.melhoria_continua.repositories;

import com.mouramateus.melhoria_continua.entities.Sector;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SectorRepository extends JpaRepository<Sector, Long> {
}
