package com.example.waterbillingsystem.ws.rest.provided.converter;

import com.example.waterbillingsystem.bean.ExpensesCategory;
import com.example.waterbillingsystem.service.util.NumberUtil;
import com.example.waterbillingsystem.service.util.StringUtil;
import com.example.waterbillingsystem.ws.rest.provided.vo.ExpensesCategoryVo;
import org.springframework.stereotype.Component;

@Component
public class ExpensesCategoryConverter extends AbstractConverter<ExpensesCategory, ExpensesCategoryVo> {
    @Override
    public ExpensesCategory toEntity(ExpensesCategoryVo vo) {
        if (vo == null) {
            return null;
        } else {
            ExpensesCategory expensesCategoryEntity = new ExpensesCategory();

            if (StringUtil.isNotEmpty2(vo.getId())) {
                expensesCategoryEntity.setId(NumberUtil.toLong(vo.getId()));
            }
            if (StringUtil.isNotEmpty2(vo.getName())) {
                expensesCategoryEntity.setName(vo.getName());
            }

            return expensesCategoryEntity;
        }
    }

    @Override
    public ExpensesCategoryVo toVo(ExpensesCategory entity) {
        if (entity == null) {
            return null;
        } else {
            ExpensesCategoryVo expensesCategoryVo = new ExpensesCategoryVo();

            if (entity.getId() != null) {
                expensesCategoryVo.setId(NumberUtil.toString(entity.getId()));
            }
            if (StringUtil.isNotEmpty2(entity.getName())) {
                expensesCategoryVo.setName(entity.getName());
            }
            return expensesCategoryVo;
        }
    }
}
