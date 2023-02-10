package com.example.waterbillingsystem.security.dao;

import com.example.waterbillingsystem.security.bean.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleDao extends JpaRepository<Role, Long> {
    Role findByAuthority(String authority);

    int deleteByAuthority(String authority);

    List<Role> findAllByUsersUsername(String username);
}
