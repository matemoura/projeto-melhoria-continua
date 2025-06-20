package com.mouramateus.melhoria_continua.services;

import com.mouramateus.melhoria_continua.dto.MoreIdeasDTO;
import com.mouramateus.melhoria_continua.entities.MoreIdeas;
import com.mouramateus.melhoria_continua.mapper.MoreIdeasMapper;
import com.mouramateus.melhoria_continua.repositories.MoreIdeasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class MoreIdeasService {

    @Autowired
    private MoreIdeasRepository moreIdeasRepository;

    public List<MoreIdeasDTO> findAll() {
        return moreIdeasRepository.findAll().stream()
                .map(MoreIdeasMapper::toDTO)
                .toList();
    }

    public MoreIdeasDTO findById(Long id) {
        return moreIdeasRepository.findById(id)
                .map(MoreIdeasMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Ideia de melhoria não encontrada com ID: " + id));
    }

    public MoreIdeasDTO save(MoreIdeasDTO dto, MultipartFile imagem) {
        MoreIdeas entity = MoreIdeasMapper.toEntity(dto);

        if (entity.getDataHoraEnvio() == null) {
            entity.setDataHoraEnvio(LocalDateTime.now());
        }
        if (entity.getStatus() == null) {
            entity.setStatus(com.mouramateus.melhoria_continua.enums.StatusIdea.ENVIADO);
        }

        if (imagem != null && !imagem.isEmpty()) {
            String imagePath = saveImage(imagem, "moreideas");
            entity.setImagemPath(imagePath);
        }

        MoreIdeas saved = moreIdeasRepository.save(entity);
        return MoreIdeasMapper.toDTO(saved);
    }

    public MoreIdeasDTO update(Long id, MoreIdeasDTO dto, MultipartFile imagem) {
        Optional<MoreIdeas> existingIdeaOpt = moreIdeasRepository.findById(id);
        if (existingIdeaOpt.isEmpty()) {
            throw new RuntimeException("Ideia de melhoria não encontrada com ID: " + id);
        }

        MoreIdeas existingIdea = existingIdeaOpt.get();

        existingIdea.setNomeUsuario(dto.getNomeUsuario());
        existingIdea.setEmailUsuario(dto.getEmailUsuario());
        existingIdea.setSetor(dto.getSetor());
        existingIdea.setDescricaoProblema(dto.getDescricaoProblema());
        existingIdea.setPossiveisSolucoes(dto.getPossiveisSolucoes());
        existingIdea.setImpactos(dto.getImpactos());
        existingIdea.setInterferenciaAtividades(dto.getInterferenciaAtividades());
        existingIdea.setExpectativaMelhoria(dto.getExpectativaMelhoria());
        existingIdea.setSugestaoNomeKaizen(dto.getSugestaoNomeKaizen());

        if (imagem != null && !imagem.isEmpty()) {
            String imagePath = saveImage(imagem, "moreideas");
            existingIdea.setImagemPath(imagePath);
        } else if (dto.getImagemPath() == null || dto.getImagemPath().isEmpty()) {
            existingIdea.setImagemPath(null);
        }

        MoreIdeas updated = moreIdeasRepository.save(existingIdea);
        return MoreIdeasMapper.toDTO(updated);
    }

    public void delete(Long id) {
        if (!moreIdeasRepository.existsById(id)) {
            throw new RuntimeException("Ideia de melhoria não encontrada com ID: " + id);
        }
        moreIdeasRepository.deleteById(id);
    }

    private String saveImage(MultipartFile file, String folder) {
        try {
            Path directory = Paths.get("uploads/" + folder);
            if (!Files.exists(directory)) {
                Files.createDirectories(directory);
            }
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path filePath = directory.resolve(fileName);
            Files.copy(file.getInputStream(), filePath);
            return "/uploads/" + folder + "/" + fileName;
        } catch (IOException e) {
            throw new RuntimeException("Erro ao salvar imagem: " + e.getMessage());
        }
    }
}
