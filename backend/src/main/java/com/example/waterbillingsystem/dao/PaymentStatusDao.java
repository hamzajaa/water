package com.example.waterbillingsystem.dao;

import com.example.waterbillingsystem.bean.Client;
import com.example.waterbillingsystem.bean.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentStatusDao extends JpaRepository<PaymentStatus,Long> {

    PaymentStatus findByCode(String code);
}
