package com.example.waterbillingsystem.security.dao;

import com.example.waterbillingsystem.security.bean.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends JpaRepository<User, Long> {
    User findByUsername(String username);

    int deleteByUsername(String username);

    User findByEmail(String email);
}
