package com.mouramateus.melhoria_continua.services;

import com.mouramateus.melhoria_continua.entities.Audit;
import com.mouramateus.melhoria_continua.repositories.AuditRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuditService {

    @Autowired
    private AuditRepository auditRepository;

    public List<Audit> findAll() {
        return auditRepository.findAll();
    }

    public Optional<Audit> findById(Long id) {
        return auditRepository.findById(id);
    }

    public Audit save(Audit audit) {
        return auditRepository.save(audit);
    }

    public void deleteById(Long id) {
        auditRepository.deleteById(id);
    }
}
