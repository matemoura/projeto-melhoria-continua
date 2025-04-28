package com.mouramateus.melhoria_continua.repositories;

import com.mouramateus.melhoria_continua.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    User findByEmail(String email);
}
