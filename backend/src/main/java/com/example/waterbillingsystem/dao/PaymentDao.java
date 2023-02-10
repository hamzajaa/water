package com.example.waterbillingsystem.dao;

import com.example.waterbillingsystem.bean.Client;
import com.example.waterbillingsystem.bean.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentDao extends JpaRepository<Payment,Long> {
}
