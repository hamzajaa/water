package com.example.waterbillingsystem.ws.rest.provided.facade;

import com.example.waterbillingsystem.bean.PaymentStatus;
import com.example.waterbillingsystem.service.admin.facade.PaymentStatusService;
import com.example.waterbillingsystem.ws.rest.provided.converter.PaymentStatusConverter;
import com.example.waterbillingsystem.ws.rest.provided.vo.PaymentStatusVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/admin/paymentStatus")
@RestController
public class PaymentStatusRestAdmin {

    @Autowired
    private PaymentStatusService paymentStatusService;
    @Autowired
    private PaymentStatusConverter paymentStatusConverter;

    @GetMapping("/")
    public List<PaymentStatusVo> findAll() {
        return paymentStatusConverter.toVo(paymentStatusService.findAll());
    }

    @GetMapping("/id/{id}")
    public PaymentStatusVo findById(@PathVariable Long id) {
        return paymentStatusConverter.toVo(paymentStatusService.findById(id));
    }

    @GetMapping("/detail/id/{id}")
    public PaymentStatusVo findByIdWithAssociatedList(@PathVariable Long id) {
        return paymentStatusConverter.toVo(paymentStatusService.findByIdWithAssociatedList(id));
    }

    @DeleteMapping("/id/{id}")
    public int deleteById(@PathVariable Long id) {
        return paymentStatusService.deleteById(id);
    }

    @PostMapping("/")
    public PaymentStatusVo save(@RequestBody PaymentStatusVo paymentStatusVo) {
        PaymentStatus paymentStatus = paymentStatusConverter.toEntity(paymentStatusVo);
        paymentStatus = paymentStatusService.save(paymentStatus);
        return paymentStatusConverter.toVo(paymentStatus);
    }

    @PostMapping("/save-list")
    public List<PaymentStatusVo> save(@RequestBody List<PaymentStatusVo> paymentStatusVos) {
        List<PaymentStatus> paymentStatuses = paymentStatusConverter.toEntity(paymentStatusVos);
        paymentStatuses = paymentStatusService.save(paymentStatuses);
        return paymentStatusConverter.toVo(paymentStatuses);
    }

    @PutMapping("/")
    public PaymentStatusVo update(@RequestBody PaymentStatusVo paymentStatusVo) {
        PaymentStatus paymentStatus = paymentStatusConverter.toEntity(paymentStatusVo);
        paymentStatus = paymentStatusService.update(paymentStatus);
        return paymentStatusConverter.toVo(paymentStatus);
    }

    @DeleteMapping("/")
    public int delete(@RequestBody PaymentStatusVo paymentStatusVo) {
        return paymentStatusService.delete(paymentStatusConverter.toEntity(paymentStatusVo));
    }

    @PostMapping("/find-criteria")
    public List<PaymentStatusVo> findByCriteria(@RequestBody PaymentStatusVo paymentStatusVo) {
        return paymentStatusConverter.toVo(paymentStatusService.findByCriteria(paymentStatusVo));
    }

    @DeleteMapping("/delete-list")
    public void delete(@RequestBody List<PaymentStatusVo> paymentStatusVos) {
        paymentStatusService.delete(paymentStatusConverter.toEntity(paymentStatusVos));
    }

    @PutMapping("/update-list")
    public void update(@RequestBody List<PaymentStatusVo> paymentStatusVos) {
        paymentStatusService.update(paymentStatusConverter.toEntity(paymentStatusVos));
    }

    @GetMapping("/find-id-code")
    public PaymentStatusVo findByIdOrCode(@RequestBody PaymentStatusVo paymentStatusVo) {
        PaymentStatus paymentStatus = paymentStatusConverter.toEntity(paymentStatusVo);
        paymentStatus = paymentStatusService.findByIdOrCode(paymentStatus);
        return paymentStatusConverter.toVo(paymentStatus);
    }
}
