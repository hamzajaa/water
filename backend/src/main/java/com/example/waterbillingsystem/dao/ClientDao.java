package com.example.waterbillingsystem.dao;

import com.example.waterbillingsystem.bean.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface ClientDao extends JpaRepository<Client, Long> {

    Client findByCounterNumber(int counter);

    Client findByUserName(String userName);

    //Client findByIdOrCounterNumber(Client client);
}
