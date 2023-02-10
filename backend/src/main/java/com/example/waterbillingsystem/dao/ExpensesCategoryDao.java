package com.example.waterbillingsystem.dao;

import com.example.waterbillingsystem.bean.ExpensesCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpensesCategoryDao extends JpaRepository<ExpensesCategory,Long> {
}
