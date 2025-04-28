package com.mouramateus.melhoria_continua.services;

import com.mouramateus.melhoria_continua.entities.Sector;
import com.mouramateus.melhoria_continua.repositories.SectorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SectorService {

    @Autowired
    private SectorRepository sectorRepository;

    public List<Sector> findAll() {
        return sectorRepository.findAll();
    }

    public Optional<Sector> findById(long id) {
        return sectorRepository.findById(id);
    }

    public Sector save(Sector sector) {
        return sectorRepository.save(sector);
    }

    public void deleteById(Long id) {
        sectorRepository.deleteById(id);
    }
}
