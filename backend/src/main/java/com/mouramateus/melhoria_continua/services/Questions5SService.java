package com.mouramateus.melhoria_continua.services;

import com.mouramateus.melhoria_continua.entities.Questions5S;
import com.mouramateus.melhoria_continua.repositories.Questions5SRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Questions5SService {

    @Autowired
    private Questions5SRepository questions5SRepository;

    public List<Questions5S> findAll() {
        return questions5SRepository.findAll();
    }

    public Optional<Questions5S> findById(Long id) {
        return questions5SRepository.findById(id);
    }

    public Questions5S save(Questions5S questions5S) {
        return questions5SRepository.save(questions5S);
    }

    public void deleteById(Long id) {
        questions5SRepository.deleteById(id);
    }
}
