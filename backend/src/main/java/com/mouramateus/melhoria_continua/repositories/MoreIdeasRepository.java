package com.mouramateus.melhoria_continua.repositories;

import com.mouramateus.melhoria_continua.entities.MoreIdeas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MoreIdeasRepository extends JpaRepository<MoreIdeas, Long> {
}
