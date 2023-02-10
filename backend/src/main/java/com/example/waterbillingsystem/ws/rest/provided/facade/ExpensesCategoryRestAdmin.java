package com.example.waterbillingsystem.ws.rest.provided.facade;

import com.example.waterbillingsystem.bean.ExpensesCategory;
import com.example.waterbillingsystem.dao.ExpensesCategoryDao;
import com.example.waterbillingsystem.service.admin.facade.ExpensesCategoryService;
import com.example.waterbillingsystem.ws.rest.provided.converter.ExpensesCategoryConverter;
import com.example.waterbillingsystem.ws.rest.provided.vo.ExpensesCategoryVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/admin/expensesCategory")
@RestController
public class ExpensesCategoryRestAdmin {

    @Autowired
    private ExpensesCategoryService expensesCategoryService;

    @Autowired
    private ExpensesCategoryConverter expensesCategoryConverter;
    @Autowired
    private ExpensesCategoryDao expensesCategoryDao;

    @GetMapping("/")
    public List<ExpensesCategoryVo> findAll() {
        return expensesCategoryConverter.toVo(expensesCategoryService.findAll());
    }

    @GetMapping("/id/{id}")
    public ExpensesCategoryVo findById(@PathVariable Long id) {
        return expensesCategoryConverter.toVo(expensesCategoryService.findById(id));
    }

    @GetMapping("/detail/id/{id}")
    public ExpensesCategoryVo findByIdWithAssociatedList(@PathVariable Long id) {
        return expensesCategoryConverter.toVo(expensesCategoryService.findByIdWithAssociatedList(id));
    }

    @DeleteMapping("/id/{id}")
    public int deleteById(@PathVariable Long id) {
        return expensesCategoryService.deleteById(id);
    }

    @PostMapping("/")
    public ExpensesCategoryVo save(@RequestBody ExpensesCategoryVo expensesCategoryVo) {
        ExpensesCategory expensesCategory = expensesCategoryConverter.toEntity(expensesCategoryVo);
        expensesCategory = expensesCategoryService.save(expensesCategory);
        return expensesCategoryConverter.toVo(expensesCategory);
    }

    @PostMapping("/save-list")
    public List<ExpensesCategoryVo> save(@RequestBody List<ExpensesCategoryVo> expensesCategoryVos) {
        List<ExpensesCategory> categories = expensesCategoryConverter.toEntity(expensesCategoryVos);
        categories = expensesCategoryService.save(categories);
        return expensesCategoryConverter.toVo(categories);
    }

    @PutMapping("/")
    public ExpensesCategoryVo update(@RequestBody ExpensesCategoryVo expensesCategoryVo) {
        ExpensesCategory expensesCategory = expensesCategoryConverter.toEntity(expensesCategoryVo);
        expensesCategory = expensesCategoryService.update(expensesCategory);
        return expensesCategoryConverter.toVo(expensesCategory);
    }

    @DeleteMapping("/")
    public int delete(ExpensesCategoryVo expensesCategoryVo) {
        return expensesCategoryService.delete(expensesCategoryConverter.toEntity(expensesCategoryVo));
    }

    @PostMapping("/find-criteria")
    public List<ExpensesCategoryVo> findByCriteria(ExpensesCategoryVo expensesCategoryVo) {
        return expensesCategoryConverter.toVo(expensesCategoryService.findByCriteria(expensesCategoryVo));
    }

    @DeleteMapping("/delete-list")
    public void delete(List<ExpensesCategoryVo> expensesCategoryVos) {
        expensesCategoryService.delete(expensesCategoryConverter.toEntity(expensesCategoryVos));
    }

    @PutMapping("/update-list")
    public void update(List<ExpensesCategoryVo> expensesCategoryVos) {
        expensesCategoryService.update(expensesCategoryConverter.toEntity(expensesCategoryVos));
    }
}
