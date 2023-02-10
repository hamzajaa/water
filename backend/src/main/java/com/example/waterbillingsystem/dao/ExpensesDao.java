package com.example.waterbillingsystem.dao;

import com.example.waterbillingsystem.bean.Expenses;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpensesDao extends JpaRepository<Expenses,Long> {
}
