package com.example.waterbillingsystem.bean;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "EXPENSES_TABLE")
@NoArgsConstructor
public class Expenses {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String title;
    private BigDecimal amount;
    private LocalDateTime dateExpense;

    @ManyToOne
    private ExpensesCategory expensesCategory;

}