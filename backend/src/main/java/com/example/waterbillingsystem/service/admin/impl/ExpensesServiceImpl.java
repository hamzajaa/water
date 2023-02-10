package com.example.waterbillingsystem.service.admin.impl;

import com.example.waterbillingsystem.bean.Expenses;
import com.example.waterbillingsystem.bean.ExpensesCategory;
import com.example.waterbillingsystem.dao.ExpensesDao;
import com.example.waterbillingsystem.dao.ExpensesDao;
import com.example.waterbillingsystem.service.admin.facade.ExpensesCategoryService;
import com.example.waterbillingsystem.service.admin.facade.ExpensesService;
import com.example.waterbillingsystem.service.util.ListUtil;
import com.example.waterbillingsystem.service.util.SearchUtil;
import com.example.waterbillingsystem.ws.rest.provided.vo.ExpensesVo;
import org.hibernate.mapping.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

@Service
public class ExpensesServiceImpl implements ExpensesService {

    @Autowired
    private ExpensesDao expensesDao;
    @Autowired
    private ExpensesCategoryService expensesCategoryService;
    @Autowired
    private EntityManager entityManager;


    @Override
    public List<Expenses> findAll() {
        return expensesDao.findAll();
    }

    @Override
    public Expenses findById(Long id) {
        if (id == null) return null;
        else {
            return expensesDao.getOne(id);
        }
    }

    @Override
    public Expenses findByIdWithAssociatedList(Long id) {
        return findById(id);
    }

    @Override
    public int deleteById(Long id) {
        int res = 0;
        Expenses foundedExpenses = findById(id);
        if (foundedExpenses != null) {
            expensesDao.deleteById(id);
            res = 1;
        }
        return res;
    }

    @Override
    public Expenses save(Expenses expenses) {
        foundedExpensesCategory(expenses);
        Expenses foundedExpenses = findById(expenses.getId());
        Expenses result = null;
        if (foundedExpenses == null) {
            result = expensesDao.save(expenses);
        }
        return result;
    }

    private void foundedExpensesCategory(Expenses expenses) {
        ExpensesCategory expensesCategory = expensesCategoryService.findById(expenses.getId());
        if (expensesCategory == null) {
            return;
        } else {
            expenses.setExpensesCategory(expensesCategory);
        }
    }

    @Override
    public List<Expenses> save(List<Expenses> list) {
        if (ListUtil.isNotEmpty(list)) {
            return list.parallelStream().map(this::save).toList();
        } else {
            return null;
        }
    }

    @Override
    public Expenses update(Expenses expenses) {
        Expenses foundedExpenses = findById(expenses.getId());
        if (foundedExpenses == null) {
            return null;
        } else {
            return expensesDao.save(expenses);
        }
    }

    @Transactional
    @Override
    public int delete(Expenses expenses) {
        Expenses foundedExpenses = findById(expenses.getId());
        if (foundedExpenses == null) {
            return -1;
        } else {
            expensesDao.deleteById(expenses.getId());
            return 1;
        }
    }

    @Override
    public List<Expenses> findByCriteria(ExpensesVo vo) {
        String query = "SELECT e FROM Expenses e WHERE 1=1 ";
        query += SearchUtil.addConstraint("e", "id", "=", vo.getId());
        query += SearchUtil.addConstraint("e", "title", "LIKE", vo.getTitle());
        query += SearchUtil.addConstraintMinMaxDate("e", "dateExpense", vo.getDateExpenseMin(), vo.getDateExpenseMax());
        query += SearchUtil.addConstraint("e", "amount", "=", vo.getAmount());
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void delete(List<Expenses> list) {
        if (ListUtil.isNotEmpty(list)) {
            //list.forEach(this::delete);
            list.stream().map(this::delete).toList();
        }
    }

    @Override
    public void update(List<Expenses> list) {
        if (ListUtil.isNotEmpty(list)) {
            list.parallelStream().map(this::update).toList();
        }
    }



}
