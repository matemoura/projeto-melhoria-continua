package com.mouramateus.melhoria_continua.controller;

import com.mouramateus.melhoria_continua.dto.SectorDTO;
import com.mouramateus.melhoria_continua.entities.Sector;
import com.mouramateus.melhoria_continua.services.SectorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;
import java.util.List;

@RestController
@RequestMapping("/api/sector")
@CrossOrigin(origins = "*")
public class SectorController {

    @Autowired
    private SectorService sectorService;

    @PostMapping
    public SectorDTO criarSector(@RequestBody SectorDTO sectorDTO) {
        Sector sector = convertToEntity(sectorDTO);
        Sector saved = sectorService.save(sector);
        return convertToDTO(saved);
    }

    @GetMapping
    public List<SectorDTO> listarSectors() {
        return sectorService.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public SectorDTO buscarSectorPorId(@PathVariable Long id) {
        Sector sector = sectorService.findById(id)
                .orElseThrow(() -> new RuntimeException("Setor não encontrado com ID: " + id));
        return convertToDTO(sector);
    }

    @DeleteMapping("/{id}")
    public void excluirSector(Long id) {
        sectorService.deleteById(id);
    }

    private SectorDTO convertToDTO(Sector sector) {
        return new SectorDTO(sector.getId(), sector.getName());
    }

    private Sector convertToEntity(SectorDTO dto) {
        return new Sector(dto.getId(), dto.getName());
    }
}
