package com.example.waterbillingsystem.service.admin.impl;

import com.example.waterbillingsystem.bean.Client;
import com.example.waterbillingsystem.bean.Payment;
import com.example.waterbillingsystem.bean.PaymentCategory;
import com.example.waterbillingsystem.bean.PaymentStatus;
import com.example.waterbillingsystem.dao.PaymentDao;
import com.example.waterbillingsystem.service.admin.facade.ClientService;
import com.example.waterbillingsystem.service.admin.facade.PaymentCategoryService;
import com.example.waterbillingsystem.service.admin.facade.PaymentService;
import com.example.waterbillingsystem.service.admin.facade.PaymentStatusService;
import com.example.waterbillingsystem.service.util.ListUtil;
import com.example.waterbillingsystem.service.util.SearchUtil;
import com.example.waterbillingsystem.ws.rest.provided.vo.PaymentVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentDao paymentDao;
    @Autowired
    private ClientService clientService;
    @Autowired
    private PaymentStatusService paymentStatusService;
    @Autowired
    private PaymentCategoryService paymentCategoryService;

    @Autowired
    private EntityManager entityManager;

    @Override
    public List<Payment> findAll() {
        return paymentDao.findAll();
    }

    @Override
    public Payment findById(Long id) {
        if (id == null) return null;
        else {
            return paymentDao.findById(id).get();
        }
    }

    @Override
    public Payment findByIdWithAssociatedList(Long id) {

        return findById(id);
    }

    @Override
    @Transactional
    public int deleteById(Long id) {
        int res = 0;
        Payment foundedPayment = findById(id);
        if (foundedPayment != null) {
            paymentDao.deleteById(id);
            res = 1;
        }
        return res;
    }

    @Override
    public Payment save(Payment payment) {
        findClient(payment);
        findPaymentCategory(payment);
        findPaymentStatus(payment);
        calculateTotalPay(payment);
        return paymentDao.save(payment);
    }

    private void calculateTotalPay(Payment payment) {
        BigDecimal consumptionRate = payment.getNewNumber().subtract(payment.getPreviousNumber());
        payment.setConsumptionRate(consumptionRate);
        BigDecimal totalPay = consumptionRate.multiply(payment.getPaymentCategory().getUnityPrice()).add(payment.getPaymentCategory().getDutyEngage());
        payment.setTotalPay(totalPay);
    }

    private void findPaymentStatus(Payment payment) {
        PaymentStatus loadedPaymentStatus = paymentStatusService.findByIdOrCode(payment.getPaymentStatus());
        if (loadedPaymentStatus == null) {
            return;
        } else {
            payment.setPaymentStatus(loadedPaymentStatus);
        }
    }

    private void findPaymentCategory(Payment payment) {
        PaymentCategory loadedPaymentCategory = paymentCategoryService.findById(payment.getPaymentCategory().getId());
        if (loadedPaymentCategory == null) {
            return;
        } else {
            payment.setPaymentCategory(loadedPaymentCategory);
        }
    }

    private void findClient(Payment payment) {
        Client loadedClient = clientService.findByIdOrCounterNumber(payment.getClient());
        if (loadedClient == null) {
            return;
        } else {
            payment.setClient(loadedClient);
        }
    }

    @Override
    public List<Payment> save(List<Payment> list) {
        if (ListUtil.isNotEmpty(list)) {
            return list.parallelStream().map(this::save).toList();
        } else {
            return Collections.emptyList();
        }
    }

    @Override
    public Payment update(Payment payment) {
        Payment loadedPayment = findById(payment.getId());
        if (loadedPayment == null) {
            return null;
        } else {
            return paymentDao.save(payment);
        }
    }

    @Override
    @Transactional
    public int delete(Payment payment) {
        if (payment.getId() == null) return -1;
        Payment loadedPayment = findById(payment.getId());
        if (loadedPayment == null) return -1;
        else {
            paymentDao.delete(payment);
            return 1;
        }

    }

    @Override
    public List<Payment> findByCriteria(PaymentVo vo) {
        String query = "SELECT p FROM Payment p WHERE 1=1";

        query += SearchUtil.addConstraint("p", "id", "=", vo.getId());
        query += SearchUtil.addConstraint("p", "previousNumber", "=", vo.getPreviousNumber());
        query += SearchUtil.addConstraint("p", "newNumber", "=", vo.getNewNumber());
        query += SearchUtil.addConstraint("p", "consumptionRate", "=", vo.getConsumptionRate());
        query += SearchUtil.addConstraint("p", "totalPay", "=", vo.getTotalPay());
        query += SearchUtil.addConstraintMinMaxDate("p", "datePay", vo.getDatePayMin(), vo.getDatePayMax());
        if (vo.getClientVo() != null) {
            query += SearchUtil.addConstraint("p", "client.id", "=", vo.getClientVo().getId());
            query += SearchUtil.addConstraint("p", "client.counterNumber", "=", vo.getClientVo().getCounterNumber());
        }
        if (vo.getPaymentCategoryVo() != null) {
            query += SearchUtil.addConstraint("p", "paymentCategory.id", "=", vo.getPaymentCategoryVo().getId());
            query += SearchUtil.addConstraint("p", "paymentCategory.code", "LIKE", vo.getPaymentCategoryVo().getCode());
        }
        if (vo.getPaymentStatusVo() != null) {
            query += SearchUtil.addConstraint("p", "paymentStatus.id", "=", vo.getPaymentStatusVo().getId());
            query += SearchUtil.addConstraint("p", "paymentStatus.code", "LIKE", vo.getPaymentStatusVo().getCode());
        }

        return entityManager.createQuery(query).getResultList();

    }

    @Override
    public void delete(List<Payment> list) {
        if (ListUtil.isNotEmpty(list)) {
            list.parallelStream().map(this::delete).toList();
        }
    }

    @Override
    public void update(List<Payment> list) {
        if (ListUtil.isNotEmpty(list)) {
            list.parallelStream().map(this::update).toList();
        }
    }


}
