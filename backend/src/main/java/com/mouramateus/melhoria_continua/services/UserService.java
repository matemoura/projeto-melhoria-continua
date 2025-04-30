package com.mouramateus.melhoria_continua.services;

import com.mouramateus.melhoria_continua.dto.UserDTO;
import com.mouramateus.melhoria_continua.entities.Sector;
import com.mouramateus.melhoria_continua.entities.User;
import com.mouramateus.melhoria_continua.repositories.SectorRepository;
import com.mouramateus.melhoria_continua.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SectorRepository sectorRepository;

    public UserDTO save(UserDTO userDTO) {
        User user = convertToEntity(userDTO);
        User savedUser = userRepository.save(user);
        return convertToDTO(savedUser);
    }

    public List<UserDTO> findAll() {
        return userRepository.findAll().stream().map(this::convertToDTO).toList();
    }

    public UserDTO findById(Long id) {
        Optional<User> userOpt = userRepository.findById(id);
        return userOpt.map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public void deleteById(long id) {
        userRepository.deleteById(id);
    }

    private UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setNome(user.getName());
        dto.setEmail(user.getEmail());
        dto.setProfile(user.getProfile());
        dto.setSetorNome(user.getSector() != null ? user.getSector().getName() : null);
        return dto;
    }

    private User convertToEntity(UserDTO dto) {
        User user = new User();
        user.setId(dto.getId());
        user.setName(dto.getNome());
        user.setEmail(dto.getEmail());
        user.setProfile(dto.getProfile());

        if (dto.getSetorNome() != null && !dto.getSetorNome().isEmpty()) {
            Sector sector = sectorRepository.findByName(dto.getSetorNome())
                    .orElseThrow(() -> new RuntimeException("Setor não encontrado: " + dto.getSetorNome()));
            user.setSector(sector);
        }
        return user;
    }
}
