package com.mouramateus.melhoria_continua.services;

import com.mouramateus.melhoria_continua.entities.MoreIdeas;
import com.mouramateus.melhoria_continua.repositories.MoreIdeasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MoreIdeasService {

    @Autowired
    private MoreIdeasRepository moreIdeasRepository;

    public List<MoreIdeas> getAll() {
        return moreIdeasRepository.findAll();
    }

    public Optional<MoreIdeas> findById(Long id) {
        return moreIdeasRepository.findById(id);
    }

    public MoreIdeas save(MoreIdeas moreIdeas) {
        return moreIdeasRepository.save(moreIdeas);
    }

    public void delete(MoreIdeas moreIdeas) {
        moreIdeasRepository.delete(moreIdeas);
    }
}
