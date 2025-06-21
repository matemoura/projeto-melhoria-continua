package com.mouramateus.melhoria_continua.services;

import com.mouramateus.melhoria_continua.dto.AreaRankingDTO;
import com.mouramateus.melhoria_continua.entities.Audit;
import com.mouramateus.melhoria_continua.entities.AuditedArea;
import com.mouramateus.melhoria_continua.repositories.AuditRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AuditRankingService {

    @Autowired
    private AuditRepository auditRepository;

    public List<AreaRankingDTO> getTotalRanking() {
        Map<String, Double> totalScores = new HashMap<>();

        List<Audit> allAudits = auditRepository.findAll();

        for (Audit audit : allAudits) {
            for (AuditedArea area : audit.getAuditedAreas()) {
                totalScores.merge(area.getNomeArea(), area.getNotaFinal(), Double::sum);
            }
        }

        List<AreaRankingDTO> ranking = new ArrayList<>();
        for (Map.Entry<String, Double> entry : totalScores.entrySet()) {
            ranking.add(new AreaRankingDTO(entry.getKey(), entry.getValue()));
        }

        ranking.sort((a, b) -> Double.compare(b.getPontuacao(), a.getPontuacao()));

        return ranking;
    }

    public List<AreaRankingDTO> getLatestAuditRanking() {
        Optional<Audit> latestAuditOpt = auditRepository.findTopByOrderByAuditDateTimeDesc();

        if (latestAuditOpt.isEmpty()) {
            return Collections.emptyList();
        }

        Audit latestAudit = latestAuditOpt.get();

        List<AreaRankingDTO> ranking = new ArrayList<>();
        for (AuditedArea area : latestAudit.getAuditedAreas()) {
            ranking.add(new AreaRankingDTO(area.getNomeArea(), area.getNotaFinal()));
        }

        ranking.sort((a, b) -> Double.compare(b.getPontuacao(), a.getPontuacao()));

        return ranking;
    }
}
