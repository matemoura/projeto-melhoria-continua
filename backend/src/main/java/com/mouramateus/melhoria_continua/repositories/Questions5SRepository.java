package com.mouramateus.melhoria_continua.repositories;

import com.mouramateus.melhoria_continua.entities.Questions5S;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Questions5SRepository extends JpaRepository<Questions5S, Long> {
}
