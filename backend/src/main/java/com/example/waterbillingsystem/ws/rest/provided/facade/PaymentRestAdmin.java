package com.example.waterbillingsystem.ws.rest.provided.facade;

import com.example.waterbillingsystem.bean.Payment;
import com.example.waterbillingsystem.service.admin.facade.PaymentService;
import com.example.waterbillingsystem.ws.rest.provided.converter.PaymentConverter;
import com.example.waterbillingsystem.ws.rest.provided.vo.PaymentVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/admin/payment")
@RestController
public class PaymentRestAdmin {
    @Autowired
    private PaymentService paymentService;
    @Autowired
    private PaymentConverter paymentConverter;

    @GetMapping("/")
    public List<PaymentVo> findAll() {
        return paymentConverter.toVo(paymentService.findAll());
    }

    @GetMapping("/id/{id}")
    public PaymentVo findById(@PathVariable Long id) {
        return paymentConverter.toVo(paymentService.findById(id));
    }

    @GetMapping("/detail/id/{id}")
    public PaymentVo findByIdWithAssociatedList(@PathVariable Long id) {
        return paymentConverter.toVo(paymentService.findByIdWithAssociatedList(id));
    }

    @DeleteMapping("/id/{id}")
    public int deleteById(@PathVariable Long id) {
        return paymentService.deleteById(id);
    }

    @PostMapping("/")
    public PaymentVo save(@RequestBody PaymentVo paymentVo) {
        Payment payment = paymentConverter.toEntity(paymentVo);
        payment = paymentService.save(payment);
        return paymentConverter.toVo(payment);
    }

    @PostMapping("/save-list")
    public List<PaymentVo> save(@RequestBody List<PaymentVo> paymentVos) {
        List<Payment> paymentStatuses = paymentConverter.toEntity(paymentVos);
        paymentStatuses = paymentService.save(paymentStatuses);
        return paymentConverter.toVo(paymentStatuses);
    }

    @PutMapping("/")
    public PaymentVo update(@RequestBody PaymentVo paymentVo) {
        Payment payment = paymentConverter.toEntity(paymentVo);
        payment = paymentService.update(payment);
        return paymentConverter.toVo(payment);
    }

    @DeleteMapping("/")
    public int delete(@RequestBody PaymentVo paymentVo) {
        return paymentService.delete(paymentConverter.toEntity(paymentVo));
    }

    @PostMapping("/search")
    public List<PaymentVo> findByCriteria(@RequestBody PaymentVo paymentVo) {
        return paymentConverter.toVo(paymentService.findByCriteria(paymentVo));
    }

    @DeleteMapping("/delete-list")
    public void delete(@RequestBody List<PaymentVo> paymentVos) {
        paymentService.delete(paymentConverter.toEntity(paymentVos));
    }

    @PutMapping("/update-list")
    public void update(@RequestBody List<PaymentVo> paymentVos) {
        paymentService.update(paymentConverter.toEntity(paymentVos));
    }
    
}
