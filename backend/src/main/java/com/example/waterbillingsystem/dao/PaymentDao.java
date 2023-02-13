package com.example.waterbillingsystem.dao;

import com.example.waterbillingsystem.bean.Client;
import com.example.waterbillingsystem.bean.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentDao extends JpaRepository<Payment,Long> {

    @Query("SELECT p FROM Payment p")
    List<Payment> findAll();
}
