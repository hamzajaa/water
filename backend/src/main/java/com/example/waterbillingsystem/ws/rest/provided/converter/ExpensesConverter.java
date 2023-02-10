package com.example.waterbillingsystem.ws.rest.provided.converter;

import com.example.waterbillingsystem.bean.Expenses;
import com.example.waterbillingsystem.service.util.DateUtil;
import com.example.waterbillingsystem.service.util.NumberUtil;
import com.example.waterbillingsystem.service.util.StringUtil;
import com.example.waterbillingsystem.ws.rest.provided.vo.ExpensesVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ExpensesConverter extends AbstractConverter<Expenses, ExpensesVo> {

    @Autowired
    private ExpensesCategoryConverter expensesCategoryConverter;

    @Override
    public Expenses toEntity(ExpensesVo vo) {
        if (vo == null) {
            return null;
        } else {
            Expenses expensesEntity = new Expenses();

            if (StringUtil.isNotEmpty2(vo.getId())) {
                expensesEntity.setId(NumberUtil.toLong(vo.getId()));
            }
            if (StringUtil.isNotEmpty2(vo.getTitle())) {
                expensesEntity.setTitle(vo.getTitle());
            }
            if (StringUtil.isNotEmpty2(vo.getDateExpense())) {
                expensesEntity.setDateExpense(DateUtil.toDate(vo.getDateExpense()));
            }
            if (StringUtil.isNotEmpty2(vo.getAmount())) {
                expensesEntity.setAmount(NumberUtil.toBigDicimal(vo.getAmount()));
            }
            if (vo.getExpensesCategoryVo() != null) {
                expensesEntity.setExpensesCategory(expensesCategoryConverter.toEntity(vo.getExpensesCategoryVo()));
            }

            return expensesEntity;
        }
    }

    @Override
    public ExpensesVo toVo(Expenses entity) {
        if (entity == null) {
            return null;
        } else {
            ExpensesVo expensesVo = new ExpensesVo();

            if (entity.getId() != null) {
                expensesVo.setId(NumberUtil.toString(entity.getId()));
            }
            if (StringUtil.isNotEmpty2(entity.getTitle())) {
                expensesVo.setTitle(entity.getTitle());
            }
            if (StringUtil.isNotEmpty2(entity.getDateExpense())) {
                expensesVo.setDateExpense(DateUtil.dateToString(entity.getDateExpense()));
            }
            if (StringUtil.isNotEmpty2(entity.getAmount())) {
                expensesVo.setAmount(NumberUtil.toString(entity.getAmount()));
            }
            if (entity.getExpensesCategory() != null) {
                expensesVo.setExpensesCategoryVo(expensesCategoryConverter.toVo(entity.getExpensesCategory()));
            }
            return expensesVo;
        }
    }
}
