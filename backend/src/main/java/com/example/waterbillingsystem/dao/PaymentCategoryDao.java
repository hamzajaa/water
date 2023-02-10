package com.example.waterbillingsystem.dao;

import com.example.waterbillingsystem.bean.PaymentCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentCategoryDao extends JpaRepository<PaymentCategory, Long> {


    PaymentCategory findByCode(String code);
    
}
