package com.mouramateus.melhoria_continua.controller;

import com.mouramateus.melhoria_continua.entities.Sector;
import com.mouramateus.melhoria_continua.services.SectorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sectors")
@CrossOrigin(origins = "http://localhost:4200")
public class SectorController {

    @Autowired
    private SectorService sectorService;

    @GetMapping
    public List<Sector> getAllSectors() {
        return sectorService.findAll();
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MELHORIA_CONTINUA')")
    public Sector createSector(@RequestBody Sector sector) {
        return sectorService.save(sector);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MELHORIA_CONTINUA')")
    public ResponseEntity<Void> deleteSetor(@PathVariable Long id) {
        sectorService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
