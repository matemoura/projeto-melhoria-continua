package com.mouramateus.melhoria_continua.services;

import com.mouramateus.melhoria_continua.entities.Sector;
import com.mouramateus.melhoria_continua.repositories.SectorRepository;
import com.mouramateus.melhoria_continua.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SectorService {

    @Autowired
    private SectorRepository sectorRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Sector> findAll() {
        return sectorRepository.findAll();
    }

    public Sector save(Sector sector) {
        return sectorRepository.save(sector);
    }

    @Transactional
    public void delete(Long id) {
        if (!sectorRepository.existsById(id)) {
            throw new RuntimeException("Setor não encontrado");
        }
        if (userRepository.existsBySectorId(id)) {
            throw new DataIntegrityViolationException("Não é possível excluir o setor, pois ele está em uso por um ou mais usuários.");
        }

        sectorRepository.deleteById(id);
    }
}
