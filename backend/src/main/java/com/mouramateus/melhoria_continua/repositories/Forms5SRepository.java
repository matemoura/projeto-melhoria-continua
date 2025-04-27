package com.mouramateus.melhoria_continua.repositories;

import com.mouramateus.melhoria_continua.entities.Form5S;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Forms5SRepository extends JpaRepository<Form5S, Long> {
}
