package com.mouramateus.melhoria_continua.controller;

import com.mouramateus.melhoria_continua.dto.AreaRankingDTO;
import com.mouramateus.melhoria_continua.services.AuditRankingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/audits/ranking")
@CrossOrigin(origins = "*")
public class AuditRankingController {

    @Autowired
    private AuditRankingService auditRankingService;

    @GetMapping("/total")
    public List<AreaRankingDTO> getTotalRanking() {
        return auditRankingService.getTotalRanking();
    }

    @GetMapping("/latest")
    public List<AreaRankingDTO> getLatestAuditRanking() {
        return auditRankingService.getLatestAuditRanking();
    }
}
