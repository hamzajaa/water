package com.example.waterbillingsystem.security.dao;

import com.example.waterbillingsystem.security.bean.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissionDao extends JpaRepository<Permission, Long> {
    public Permission findByName(String name);
}
