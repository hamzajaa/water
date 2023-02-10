package com.example.waterbillingsystem.service.admin.impl;

import com.example.waterbillingsystem.bean.ExpensesCategory;
import com.example.waterbillingsystem.bean.ExpensesCategory;
import com.example.waterbillingsystem.dao.ExpensesCategoryDao;
import com.example.waterbillingsystem.dao.ExpensesCategoryDao;
import com.example.waterbillingsystem.dao.ExpensesDao;
import com.example.waterbillingsystem.service.admin.facade.ExpensesCategoryService;
import com.example.waterbillingsystem.service.util.ListUtil;
import com.example.waterbillingsystem.service.util.SearchUtil;
import com.example.waterbillingsystem.ws.rest.provided.vo.ExpensesCategoryVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

@Service
public class ExpensesCategoryServiceImpl implements ExpensesCategoryService {

    @Autowired
    private ExpensesCategoryDao expensesCategoryDao;
    @Autowired
    private EntityManager entityManager;


    @Override
    public List<ExpensesCategory> findAll() {
        return expensesCategoryDao.findAll();
    }

    @Override
    public ExpensesCategory findById(Long id) {
        if (id == null) return null;
        else {
            return expensesCategoryDao.getOne(id);
        }
    }

    @Override
    public ExpensesCategory findByIdWithAssociatedList(Long id) {
        return findById(id);
    }

    @Override
    public int deleteById(Long id) {
        int res = 0;
        ExpensesCategory foundedExpensesCategory = findById(id);
        if (foundedExpensesCategory != null) {
            expensesCategoryDao.deleteById(id);
            res = 1;
        }
        return res;
    }

    @Override
    public ExpensesCategory save(ExpensesCategory expensesCategory) {
        ExpensesCategory foundedExpensesCategory = findById(expensesCategory.getId());
        ExpensesCategory result = null;
        if (foundedExpensesCategory == null) {
            result = expensesCategoryDao.save(expensesCategory);
        }
        return result;
    }

    @Override
    public List<ExpensesCategory> save(List<ExpensesCategory> list) {
        if (ListUtil.isNotEmpty(list)) {
            return list.parallelStream().map(this::save).toList();
        } else {
            return null;
        }
    }

    @Override
    public ExpensesCategory update(ExpensesCategory expensesCategory) {
        ExpensesCategory foundedExpensesCategory = findById(expensesCategory.getId());
        if (foundedExpensesCategory == null) {
            return null;
        } else {
            return expensesCategoryDao.save(expensesCategory);
        }
    }

    @Transactional
    @Override
    public int delete(ExpensesCategory expensesCategory) {
        ExpensesCategory foundedExpensesCategory = findById(expensesCategory.getId());
        if (foundedExpensesCategory == null) {
            return -1;
        } else {
            expensesCategoryDao.deleteById(expensesCategory.getId());
            return 1;
        }
    }

    @Override
    public List<ExpensesCategory> findByCriteria(ExpensesCategoryVo vo) {
        String query = "SELECT ex FROM ExpensesCategory ex WHERE 1=1 ";
        query += SearchUtil.addConstraint("ex", "id", "=", vo.getId());
        query += SearchUtil.addConstraint("ex", "name", "LIKE", vo.getName());
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void delete(List<ExpensesCategory> list) {
        if (ListUtil.isNotEmpty(list)) {
            //list.forEach(this::delete);
            list.stream().map(this::delete).toList();
        }
    }

    @Override
    public void update(List<ExpensesCategory> list) {
        if (ListUtil.isNotEmpty(list)) {
            list.parallelStream().map(this::update).toList();
        }
    }
}
