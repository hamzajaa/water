package com.example.waterbillingsystem.ws.rest.provided.facade;

import com.example.waterbillingsystem.bean.Expenses;
import com.example.waterbillingsystem.dao.ExpensesDao;
import com.example.waterbillingsystem.service.admin.facade.ExpensesService;
import com.example.waterbillingsystem.ws.rest.provided.converter.ExpensesConverter;
import com.example.waterbillingsystem.ws.rest.provided.vo.ExpensesVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/admin/expenses")
@RestController
public class ExpensesRestAdmin {

    @Autowired
    private ExpensesService expensesService;

    @Autowired
    private ExpensesConverter expensesConverter;
    @Autowired
    private ExpensesDao expensesDao;

    @GetMapping("/")
    public List<ExpensesVo> findAll() {
        return expensesConverter.toVo(expensesService.findAll());
    }

    @GetMapping("/id/{id}")
    public ExpensesVo findById(@PathVariable Long id) {
        return expensesConverter.toVo(expensesService.findById(id));
    }

    @GetMapping("/detail/id/{id}")
    public ExpensesVo findByIdWithAssociatedList(@PathVariable Long id) {
        return expensesConverter.toVo(expensesService.findByIdWithAssociatedList(id));
    }

    @DeleteMapping("/id/{id}")
    public int deleteById(@PathVariable Long id) {
        return expensesService.deleteById(id);
    }

    @PostMapping("/")
    public ExpensesVo save(@RequestBody ExpensesVo expensesVo) {
        Expenses expenses = expensesConverter.toEntity(expensesVo);
        expenses = expensesService.save(expenses);
        return expensesConverter.toVo(expenses);
    }

    @PostMapping("/save-list")
    public List<ExpensesVo> save(@RequestBody List<ExpensesVo> expensesVos) {
        List<Expenses> categories = expensesConverter.toEntity(expensesVos);
        categories = expensesService.save(categories);
        return expensesConverter.toVo(categories);
    }

    @PutMapping("/")
    public ExpensesVo update(@RequestBody ExpensesVo expensesVo) {
        Expenses expenses = expensesConverter.toEntity(expensesVo);
        expenses = expensesService.update(expenses);
        return expensesConverter.toVo(expenses);
    }

    @DeleteMapping("/")
    public int delete(ExpensesVo expensesVo) {
        return expensesService.delete(expensesConverter.toEntity(expensesVo));
    }

    @PostMapping("/find-criteria")
    public List<ExpensesVo> findByCriteria(ExpensesVo expensesVo) {
        return expensesConverter.toVo(expensesService.findByCriteria(expensesVo));
    }

    @DeleteMapping("/delete-list")
    public void delete(List<ExpensesVo> expensesVos) {
        expensesService.delete(expensesConverter.toEntity(expensesVos));
    }

    @PutMapping("/update-list")
    public void update(List<ExpensesVo> expensesVos) {
        expensesService.update(expensesConverter.toEntity(expensesVos));
    }
}
