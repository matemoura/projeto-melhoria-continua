package com.mouramateus.melhoria_continua.services;

import com.mouramateus.melhoria_continua.entities.Audit;
import com.mouramateus.melhoria_continua.entities.AuditedArea;
import com.mouramateus.melhoria_continua.repositories.AuditRepository;
import com.mouramateus.melhoria_continua.repositories.AuditedAreaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AuditService {

    @Autowired
    private AuditRepository auditRepository;

    @Autowired
    private AuditedAreaRepository auditedAreaRepository;

    private final String uploadDir = "uploads/audits/";

    public Audit submitAudit(Audit audit, MultipartFile imageFile) throws IOException {
        if (imageFile != null && !imageFile.isEmpty()) {
            String fileName = UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename();
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            Files.copy(imageFile.getInputStream(), uploadPath.resolve(fileName));
            audit.setImageUrl("/uploads/audits/" + fileName);
        }
        if (audit.getAuditedAreas() != null) {
            for (AuditedArea area : audit.getAuditedAreas()) {
                area.setAudit(audit);
            }
        }
        return auditRepository.save(audit);
    }

    public List<Map<String, Object>> getTotalRanking() {
        Map<String, Double> rankingMap = new HashMap<>();
        List<AuditedArea> allAuditedAreas = auditedAreaRepository.findAll();

        for (AuditedArea area : allAuditedAreas) {
            rankingMap.merge(area.getNomeArea(), area.getNotaFinal(), Double::sum);
        }

        return rankingMap.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> item = new HashMap<>();
                    item.put("nomeArea", entry.getKey());
                    item.put("pontuacao", entry.getValue());
                    return item;
                })
                .sorted((a1, a2) -> ((Double)a2.get("pontuacao")).compareTo((Double)a1.get("pontuacao")))
                .collect(Collectors.toList());
    }

    public List<Map<String, Object>> getLatestAuditRanking() {
        Map<String, AuditedArea> latestAreaAudits = auditedAreaRepository.findAll().stream()
                .collect(Collectors.toMap(
                        AuditedArea::getNomeArea,
                        area -> area,
                        (existing, replacement) ->
                                existing.getAudit().getAuditDateTime().isAfter(replacement.getAudit().getAuditDateTime()) ? existing : replacement
                ));

        return latestAreaAudits.values().stream()
                .map(area -> {
                    Map<String, Object> item = new HashMap<>();
                    item.put("nomeArea", area.getNomeArea());
                    item.put("pontuacao", area.getNotaFinal());
                    return item;
                })
                .sorted((a1, a2) -> ((Double)a2.get("pontuacao")).compareTo((Double)a1.get("pontuacao")))
                .collect(Collectors.toList());
    }

    public List<Map<String, Object>> getHistoryByArea(String areaName) {
        List<AuditedArea> areas = auditedAreaRepository.findByNomeAreaOrderByAudit_AuditDateTimeDesc(areaName);

        return areas.stream().map(area -> {
            Map<String, Object> historyItem = new HashMap<>();
            historyItem.put("id", area.getId());
            historyItem.put("nomeArea", area.getNomeArea());
            historyItem.put("notaFinal", area.getNotaFinal());
            historyItem.put("seiri", area.getSeiri());
            historyItem.put("seiton", area.getSeiton());
            historyItem.put("seiso", area.getSeiso());
            historyItem.put("seiketsu", area.getSeiketsu());
            historyItem.put("shitsuke", area.getShitsuke());

            if (area.getAudit() != null) {
                historyItem.put("auditDateTime", area.getAudit().getAuditDateTime());
                historyItem.put("auditor", area.getAudit().getAuditor());
                historyItem.put("imageUrl", area.getAudit().getImageUrl());
            }
            return historyItem;
        }).collect(Collectors.toList());
    }

    public List<String> getDistinctAuditedAreas() {
        return auditRepository.findDistinctAreaNames();
    }

    public List<Audit> findByAreaName(String area) {
        return auditRepository.findByAuditedAreasNomeArea(area);
    }
}
