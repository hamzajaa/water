package com.example.waterbillingsystem.ws.rest.provided.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExpensesVo {

    private String id;
    private String title;
    private String dateExpense;
    private String dateExpenseMin;
    private String dateExpenseMax;
    private String amount;
    private ExpensesCategoryVo expensesCategoryVo;

}
