package com.example.waterbillingsystem.security.ws;

import com.example.waterbillingsystem.security.bean.Role;
import com.example.waterbillingsystem.security.service.facade.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/roles/admin")
@RestController
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class RoleRest {
    @Autowired
    private RoleService roleService;

    // @PreAuthorize("hasRole(AuthoritiesConstants.super_admin)")
    @GetMapping("/")
    public List<Role> findAll() {
        return this.roleService.findAll();
    }

    @DeleteMapping("/id/{id}")
    public void deleteById(Long id) {
        roleService.deleteById(id);
    }

    @PostMapping("/save/")
    public Role save(@RequestBody Role role) {
        return roleService.save(role);
    }

    @PutMapping("/update/")
    public Role update(@RequestBody Role role) {
        return roleService.update(role);
    }

    @DeleteMapping("")
    public int delete(Role role) {
        return roleService.delete(role);
    }
}
