package com.mouramateus.melhoria_continua.controller;

import com.mouramateus.melhoria_continua.entities.Goal;
import com.mouramateus.melhoria_continua.services.GapAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/gap-analysis")
public class GapAnalysisController {

    @Autowired
    private GapAnalysisService gapAnalysisService;

    @GetMapping("/goals/{year}")
    public ResponseEntity<List<Goal>> getGoals(@PathVariable int year) {
        return ResponseEntity.ok(gapAnalysisService.getGoalsByYear(year));
    }

    @PostMapping("/goals")
    public ResponseEntity<Goal> setGoal(@RequestBody Goal goal) {
        return ResponseEntity.ok(gapAnalysisService.setGoal(goal));
    }

    @GetMapping("/ideas-count/{year}")
    public ResponseEntity<Map<String, Map<Integer, Long>>> getIdeasCount(@PathVariable int year) {
        return ResponseEntity.ok(gapAnalysisService.getIdeasCountBySectorAndMonth(year));
    }
}
