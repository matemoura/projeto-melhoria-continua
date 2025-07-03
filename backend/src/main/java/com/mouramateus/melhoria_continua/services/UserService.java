package com.mouramateus.melhoria_continua.services;

import com.mouramateus.melhoria_continua.dto.UserUpdateRequest;
import com.mouramateus.melhoria_continua.entities.Profile;
import com.mouramateus.melhoria_continua.entities.Sector;
import com.mouramateus.melhoria_continua.entities.User;
import com.mouramateus.melhoria_continua.repositories.SectorRepository;
import com.mouramateus.melhoria_continua.repositories.UserRepository;
import com.mouramateus.melhoria_continua.services.exceptions.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SectorRepository sectorRepository;


    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User updateProfile(Long userId, String profile) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
        user.setProfile(Profile.valueOf(profile));
        return userRepository.save(user);
    }

    @Transactional
    public User updateUser(Long userId, UserUpdateRequest updateRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário com ID " + userId + " não encontrado."));

        if (updateRequest.getProfile() != null) {
            user.setProfile(Profile.valueOf(updateRequest.getProfile()));
        }

        if (updateRequest.getSetorId() != null) {
            Sector sector = sectorRepository.findById(updateRequest.getSetorId())
                    .orElseThrow(() -> new ResourceNotFoundException("Erro: Setor com ID " + updateRequest.getSetorId() + " não existe mais. Atualize a página e tente novamente."));
            user.setSector(sector);
        } else {
            user.setSector(null);
        }

        return userRepository.save(user);
    }
}
