package com.example.waterbillingsystem.security.service.impl;

import com.example.waterbillingsystem.bean.Chercheur;
import com.example.waterbillingsystem.security.bean.Role;
import com.example.waterbillingsystem.security.bean.User;
import com.example.waterbillingsystem.security.dao.UserDao;
import com.example.waterbillingsystem.security.service.facade.RoleService;
import com.example.waterbillingsystem.security.service.facade.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class UserServiceImpl implements UserService {


    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleService roleService;

    @Autowired
    PasswordEncoder bCryptPasswordEncoder;

    @Override
    public List<User> findAll() {
        return userDao.findAll();
    }

    @Override
    public User findByUsername(String username) {
        if (username == null)
            return null;
        return userDao.findByUsername(username);
    }

    @Override
    public User findByUsernameWithRoles(String username) {
        if (username == null)
            return null;
        return userDao.findByUsername(username);
    }

    @Override
    @Transactional
    public int deleteByUsername(String username) {
        return userDao.deleteByUsername(username);
    }

    @Override
    public User findById(Long id) {
        if (id == null)
            return null;
        return userDao.getOne(id);
    }

    @Transactional
    public void deleteById(Long id) {
        userDao.deleteById(id);
    }

    @Override
    public User save(User user) {
        User foundedUserByUsername = findByUsername(user.getUsername());
        User foundedUserByEmail = userDao.findByEmail(user.getEmail());
        if (foundedUserByUsername != null || foundedUserByEmail != null) return null;
        else {
    /*if (user.getPassword() == null || user.getPassword().isEmpty()) {
    user.setPassword(bCryptPasswordEncoder.encode(user.getUsername()));
    }
    else {
    user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
    }*/
            user.setPassword(bCryptPasswordEncoder.encode("123"));
            user.setAccountNonExpired(true);
            user.setAccountNonLocked(true);
            user.setCredentialsNonExpired(true);
            user.setEnabled(true);
            user.setPasswordChanged(false);
            user.setCreatedAt(new Date());

            if (user.getRoles() != null) {
                Collection<Role> roles = new ArrayList<Role>();
                for (Role role : user.getRoles()) {
                    roles.add(roleService.save(role));
                }
                user.setRoles(roles);
            }
            User mySaved = userDao.save(user);
            for (Role role : user.getRoles()) {
                if (role.getAuthority().equals("ROLE_CHERCHEUR")) {
                }
            }
            return mySaved;
        }
    }

    private Chercheur transformToChercheur(User user) {
        Chercheur chercheur = new Chercheur();
        chercheur.setUsername(user.getUsername() + "-CH");
        chercheur.setPassword(user.getPassword());
        chercheur.setEmail(user.getEmail());
        chercheur.setPrenom(user.getPrenom());
        chercheur.setNom(user.getNom());
        chercheur.setTelephone(user.getTelephone());
        chercheur.getRoles().addAll(user.getRoles());
        chercheur.setAccountNonExpired(true);
        chercheur.setAccountNonLocked(true);
        chercheur.setCredentialsNonExpired(true);
        chercheur.setEnabled(true);
        chercheur.setPasswordChanged(false);
        chercheur.setCreatedAt(new Date());
        return chercheur;
    }

    @Override
    public User update(User user) {
        User foundedUser = findById(user.getId());
        if (foundedUser == null) return null;
        else {
            foundedUser.setEmail(user.getEmail());
            foundedUser.setUsername(user.getUsername());
            foundedUser.setPrenom(user.getPrenom());
            foundedUser.setNom(user.getNom());
            foundedUser.setTelephone(user.getTelephone());
            foundedUser.setEnabled(user.isEnabled());
            foundedUser.setCredentialsNonExpired(user.isCredentialsNonExpired());
            foundedUser.setAccountNonLocked(user.isAccountNonLocked());
            if(!Objects.equals(user.getPassword(), foundedUser.getPassword())){
                foundedUser.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
                foundedUser.setPasswordChanged(true);
            }
            foundedUser.setAccountNonExpired(user.isAccountNonExpired());
            foundedUser.setAuthorities(new ArrayList<>());
            Collection<Role> roles = new ArrayList<Role>();
            for (Role role : user.getRoles()) {
                roles.add(roleService.save(role));
            }
            foundedUser.setRoles(roles);
            return userDao.save(foundedUser);
        }
    }

    @Override
    @Transactional
    public int delete(Long id) {
        User foundedUser = findById(id);
        if (foundedUser == null) return -1;
        userDao.delete(foundedUser);
        return 1;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return findByUsernameWithRoles(username);
    }
}
