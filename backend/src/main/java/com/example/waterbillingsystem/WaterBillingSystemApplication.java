package com.example.waterbillingsystem;

import com.example.waterbillingsystem.bean.Chercheur;
import com.example.waterbillingsystem.security.bean.Permission;
import com.example.waterbillingsystem.security.bean.Role;
import com.example.waterbillingsystem.security.bean.User;
import com.example.waterbillingsystem.security.common.AuthoritiesConstants;
import com.example.waterbillingsystem.security.service.facade.RoleService;
import com.example.waterbillingsystem.security.service.facade.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@EnableWebMvc
@SpringBootApplication
@EnableScheduling
public class WaterBillingSystemApplication {

        public static ConfigurableApplicationContext ctx;

        public static void main (String[] args){
            ctx = SpringApplication.run(WaterBillingSystemApplication.class, args);
        }

        public static ConfigurableApplicationContext getCtx () {
            return ctx;
        }


    @Bean
    public CommandLineRunner demo(UserService userService, RoleService roleService
    ) {
        return (args) -> {
            if (false) {
                Map<String, String> etats = new HashMap<>();
                etats.put("Initialisé", "initialise");
                etats.put("En cours", "encours");
                etats.put("Terminé", "termine");


                // Role admin
                User userForAdmin = new User("admin");
                Role roleForAdmin = new Role();
                roleForAdmin.setAuthority(AuthoritiesConstants.ADMIN);
                List<Permission> permissionsForAdmin = new ArrayList<>();
                addPermissionForAdmin(permissionsForAdmin);
                roleForAdmin.setPermissions(permissionsForAdmin);
                if (userForAdmin.getRoles() == null)
                    userForAdmin.setRoles(new ArrayList<>());
                userForAdmin.getRoles().add(roleForAdmin);
                userService.save(userForAdmin);


                // Role chercheur
                Chercheur userForChercheur = new Chercheur("chercheur");

                Role roleForChercheur = new Role();
                roleForChercheur.setAuthority(AuthoritiesConstants.CHERCHEUR);
                List<Permission> permissionsForChercheur = new ArrayList<>();
                addPermissionForChercheur(permissionsForChercheur);
                roleForChercheur.setPermissions(permissionsForChercheur);
                if (userForChercheur.getRoles() == null)
                    userForChercheur.setRoles(new ArrayList<>());

                userForChercheur.getRoles().add(roleForChercheur);
                userService.save(userForChercheur);
            }
        };
    }

    private static void addPermissionForAdmin(List<Permission> permissions) {
      }

    private static void addPermissionForChercheur(List<Permission> permissions) {
      }


}
