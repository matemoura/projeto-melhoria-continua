package com.mouramateus.melhoria_continua.services;

import com.mouramateus.melhoria_continua.entities.Form5S;
import com.mouramateus.melhoria_continua.repositories.Forms5SRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Forms5SService {

    @Autowired
    private Forms5SRepository forms5SRepository;

    public List<Form5S> findAll() {
        return forms5SRepository.findAll();
    }

    public Optional<Form5S> findById(long id) {
        return forms5SRepository.findById(id);
    }

    public Form5S save(Form5S form5S) {
        return forms5SRepository.save(form5S);
    }

    public void deleteById(long id) {
        forms5SRepository.deleteById(id);
    }
}
