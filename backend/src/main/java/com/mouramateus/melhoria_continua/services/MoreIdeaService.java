package com.mouramateus.melhoria_continua.services;

import com.mouramateus.melhoria_continua.dto.UpdateMoreIdeaDto;
import com.mouramateus.melhoria_continua.entities.MoreIdea;
import com.mouramateus.melhoria_continua.enums.StatusIdea;
import com.mouramateus.melhoria_continua.repositories.MoreIdeaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class MoreIdeaService {

    @Autowired
    private MoreIdeaRepository moreIdeaRepository;

    private final String uploadDir = "uploads/more-ideas/";

    public List<MoreIdea> getAllIdeas(String term, StatusIdea status) {
        boolean hasTerm = StringUtils.hasText(term);

        if (status != null && hasTerm) {
            return moreIdeaRepository.findByStatusAndTermo(status, term);
        } else if (status != null) {
            return moreIdeaRepository.findByStatus(status);
        } else if (hasTerm) {
            return moreIdeaRepository.findByTermo(term);
        }
        return moreIdeaRepository.findAll();
    }

    public MoreIdea submitIdea(MoreIdea idea, MultipartFile imageFile) throws IOException {
        if (imageFile != null && !imageFile.isEmpty()) {
            String fileName = UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename();
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            Files.copy(imageFile.getInputStream(), uploadPath.resolve(fileName));
            idea.setImageUrl("/uploads/more-ideas/" + fileName);
        }
        return moreIdeaRepository.save(idea);
    }

    public MoreIdea updateStatus(Long id, StatusIdea status) {
        MoreIdea idea = moreIdeaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ideia não encontrada"));
        idea.setStatus(status);
        return moreIdeaRepository.save(idea);
    }

    public MoreIdea update(Long id, UpdateMoreIdeaDto dto) {
        MoreIdea idea = moreIdeaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ideia não encontrada com o id: " + id));

        if (dto.getStatus() != null && StringUtils.hasText(dto.getStatus())) {
            StatusIdea newStatus = StatusIdea.valueOf(dto.getStatus().toUpperCase());
            idea.setStatus(newStatus);
        }
        if (dto.getKaizenName() != null) {
            idea.setKaizenName(dto.getKaizenName());
        }

        return moreIdeaRepository.save(idea);
    }
}
