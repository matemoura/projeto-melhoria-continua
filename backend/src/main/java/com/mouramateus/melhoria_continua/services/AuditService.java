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
        return auditRepository.save(audit);
    }

    public List<Map<String, Object>> getTotalRanking() {
        Map<String, Integer> rankingMap = new HashMap<>();
        List<AuditedArea> allAuditedAreas = auditedAreaRepository.findAll();

        for (AuditedArea area : allAuditedAreas) {
            rankingMap.merge(area.getNomeArea(), area.getNotaFinal(), Integer::sum);
        }

        return rankingMap.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> item = new HashMap<>();
                    item.put("nomeArea", entry.getKey());
                    item.put("pontuacao", entry.getValue());
                    return item;
                })
                .sorted((a1, a2) -> ((Integer)a2.get("pontuacao")).compareTo((Integer)a1.get("pontuacao")))
                .collect(Collectors.toList());
    }

    public List<Map<String, Object>> getLatestAuditRanking() {
        Audit latestAudit = auditRepository.findAll().stream()
                .max((a1, a2) -> a1.getAuditDateTime().compareTo(a2.getAuditDateTime()))
                .orElse(null);

        if (latestAudit == null) {
            return List.of();
        }

        return latestAudit.getAuditedAreas().stream()
                .map(area -> {
                    Map<String, Object> item = new HashMap<>();
                    item.put("nomeArea", area.getNomeArea());
                    item.put("pontuacao", area.getNotaFinal());
                    return item;
                })
                .sorted((a1, a2) -> ((Integer)a2.get("pontuacao")).compareTo((Integer)a1.get("pontuacao")))
                .collect(Collectors.toList());
    }
}
