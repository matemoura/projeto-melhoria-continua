package com.mouramateus.melhoria_continua.repositories;

import com.mouramateus.melhoria_continua.entities.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GoalRepository extends JpaRepository<Goal, Long> {

    List<Goal> findByYear(int year);

}
