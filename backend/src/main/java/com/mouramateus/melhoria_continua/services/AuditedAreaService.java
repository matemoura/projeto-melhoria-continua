package com.mouramateus.melhoria_continua.services;

import com.mouramateus.melhoria_continua.entities.AuditedArea;
import com.mouramateus.melhoria_continua.repositories.AuditedAreaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuditedAreaService {

    @Autowired
    private AuditedAreaRepository auditedAreaRepository;

    public List<AuditedArea> findAll() {
        return auditedAreaRepository.findAll();
    }

    public Optional<AuditedArea> findById(Long id) {
        return auditedAreaRepository.findById(id);
    }

    public AuditedArea save(AuditedArea auditedArea) {
        return auditedAreaRepository.save(auditedArea);
    }

    public void deleteById(Long id) {
        auditedAreaRepository.deleteById(id);
    }
}
