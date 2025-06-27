package com.mouramateus.melhoria_continua.services;

import com.mouramateus.melhoria_continua.entities.Goal;
import com.mouramateus.melhoria_continua.entities.MoreIdea;
import com.mouramateus.melhoria_continua.repositories.GoalRepository;
import com.mouramateus.melhoria_continua.repositories.MoreIdeaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class GapAnalysisService {

    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    private MoreIdeaRepository moreIdeaRepository;

    public List<Goal> getGoalsByYear(int year) {
        return goalRepository.findByYear(year);
    }

    public Goal setGoal(Goal goal) {
        return goalRepository.save(goal);
    }

    public Map<String, Map<Integer, Long>> getIdeasCountBySectorAndMonth(int year) {
        List<MoreIdea> ideas = moreIdeaRepository.findAll().stream()
                .filter(idea -> idea.getCreatedAt().getYear() == year)
                .collect(Collectors.toList());

        return ideas.stream()
                .collect(Collectors.groupingBy(
                        MoreIdea::getSetor,
                        Collectors.groupingBy(
                                idea -> idea.getCreatedAt().getMonthValue(),
                                Collectors.counting()
                        )
                ));
    }
}
