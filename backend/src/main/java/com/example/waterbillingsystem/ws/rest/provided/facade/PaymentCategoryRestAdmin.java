package com.example.waterbillingsystem.ws.rest.provided.facade;

import com.example.waterbillingsystem.bean.PaymentCategory;
import com.example.waterbillingsystem.dao.PaymentCategoryDao;
import com.example.waterbillingsystem.service.admin.facade.PaymentCategoryService;
import com.example.waterbillingsystem.ws.rest.provided.converter.PaymentCategoryConverter;
import com.example.waterbillingsystem.ws.rest.provided.vo.PaymentCategoryVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/admin/paymentCategory")
@RestController
public class PaymentCategoryRestAdmin {

    @Autowired
    private PaymentCategoryService paymentCategoryService;

    @Autowired
    private PaymentCategoryConverter paymentCategoryConverter;
    @Autowired
    private PaymentCategoryDao paymentCategoryDao;

    @GetMapping("/")
    public List<PaymentCategoryVo> findAll() {
        return paymentCategoryConverter.toVo(paymentCategoryService.findAll());
    }

    @GetMapping("/id/{id}")
    public PaymentCategoryVo findById(@PathVariable Long id) {
        return paymentCategoryConverter.toVo(paymentCategoryService.findById(id));
    }

    @GetMapping("/detail/id/{id}")
    public PaymentCategoryVo findByIdWithAssociatedList(@PathVariable Long id) {
        return paymentCategoryConverter.toVo(paymentCategoryService.findByIdWithAssociatedList(id));
    }

    @DeleteMapping("/id/{id}")
    public int deleteById(@PathVariable Long id) {
        return paymentCategoryService.deleteById(id);
    }

    @PostMapping("/")
    public PaymentCategoryVo save(@RequestBody PaymentCategoryVo paymentCategoryVo) {
        PaymentCategory paymentCategory = paymentCategoryConverter.toEntity(paymentCategoryVo);
        paymentCategory = paymentCategoryService.save(paymentCategory);
        return paymentCategoryConverter.toVo(paymentCategory);
    }

    @PostMapping("/save-list")
    public List<PaymentCategoryVo> save(@RequestBody List<PaymentCategoryVo> paymentCategoryVos) {
        List<PaymentCategory> categories = paymentCategoryConverter.toEntity(paymentCategoryVos);
        categories = paymentCategoryService.save(categories);
        return paymentCategoryConverter.toVo(categories);
    }

    @PutMapping("/")
    public PaymentCategoryVo update(@RequestBody PaymentCategoryVo paymentCategoryVo) {
        PaymentCategory paymentCategory = paymentCategoryConverter.toEntity(paymentCategoryVo);
        paymentCategory = paymentCategoryService.update(paymentCategory);
        return paymentCategoryConverter.toVo(paymentCategory);
    }

    @DeleteMapping("/")
    public int delete(PaymentCategoryVo paymentCategoryVo) {
        return paymentCategoryService.delete(paymentCategoryConverter.toEntity(paymentCategoryVo));
    }

    @PostMapping("/find-criteria")
    public List<PaymentCategoryVo> findByCriteria(PaymentCategoryVo paymentCategoryVo) {
        return paymentCategoryConverter.toVo(paymentCategoryService.findByCriteria(paymentCategoryVo));
    }

    @DeleteMapping("/delete-list")
    public void delete(List<PaymentCategoryVo> paymentCategoryVos) {
        paymentCategoryService.delete(paymentCategoryConverter.toEntity(paymentCategoryVos));
    }

    @PutMapping("/update-list")
    public void update(List<PaymentCategoryVo> paymentCategoryVos) {
        paymentCategoryService.update(paymentCategoryConverter.toEntity(paymentCategoryVos));
    }
}
