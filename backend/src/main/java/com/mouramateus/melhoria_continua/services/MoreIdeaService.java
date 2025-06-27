package com.mouramateus.melhoria_continua.services;

import com.mouramateus.melhoria_continua.entities.MoreIdea;
import com.mouramateus.melhoria_continua.enums.StatusIdea;
import com.mouramateus.melhoria_continua.repositories.MoreIdeaRepository;
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

    public List<MoreIdea> getAllIdeas(String name, StatusIdea status) {
        boolean hasName = StringUtils.hasText(name);

        if (status != null && hasName) {
            return moreIdeaRepository.findByStatusAndNomeUsuarioContainingIgnoreCase(status, name);
        } else if (status != null) {
            return moreIdeaRepository.findByStatus(status);
        } else if (hasName) {
            return moreIdeaRepository.findByNomeUsuarioContainingIgnoreCase(name);
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
}
