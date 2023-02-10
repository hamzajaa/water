package com.example.waterbillingsystem.service.admin.impl;

import com.example.waterbillingsystem.bean.PaymentStatus;
import com.example.waterbillingsystem.dao.PaymentStatusDao;
import com.example.waterbillingsystem.service.admin.facade.PaymentStatusService;
import com.example.waterbillingsystem.service.util.ListUtil;
import com.example.waterbillingsystem.service.util.SearchUtil;
import com.example.waterbillingsystem.service.util.StringUtil;
import com.example.waterbillingsystem.ws.rest.provided.vo.PaymentStatusVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class PaymentStatusServiceImpl implements PaymentStatusService {

    @Autowired
    private PaymentStatusDao paymentStatusDao;
    @Autowired
    private EntityManager entityManager;


    @Override
    public List<PaymentStatus> findAll() {
        return paymentStatusDao.findAll();
    }

    @Override
    public PaymentStatus findById(Long id) {
        if (id == null) {
            return null;
        } else {
            return paymentStatusDao.getOne(id);
        }
    }

    @Override
    public PaymentStatus findByIdWithAssociatedList(Long id) {
        return findById(id);
    }

    @Override
    @Transactional
    public int deleteById(Long id) {
        int res = 0;
        if (paymentStatusDao.findById(id).isPresent()) {
            paymentStatusDao.deleteById(id);
            res = 1;
        }
        return res;
    }

    @Override
    public PaymentStatus save(PaymentStatus paymentStatus) {
        PaymentStatus foundedPaymentStatus = paymentStatusDao.findByCode(paymentStatus.getCode());
        PaymentStatus result = null;
        if (foundedPaymentStatus == null) {
            result = paymentStatusDao.save(paymentStatus);
        }
        return result;
    }

    @Override
    public List<PaymentStatus> save(List<PaymentStatus> list) {
        List<PaymentStatus> result = null;
        if (ListUtil.isNotEmpty(list)) {
            List<PaymentStatus> paymentStatusList = new ArrayList<>();
            result = list.parallelStream().filter(ps -> paymentStatusList.add(save(ps))).toList();
        }
        return result;
    }

    @Override
    public PaymentStatus update(PaymentStatus paymentStatus) {
        PaymentStatus foundedPaymentStatus = findById(paymentStatus.getId());
        PaymentStatus result = null;
        if (foundedPaymentStatus != null) {
            result = paymentStatusDao.save(paymentStatus);
        }
        return result;
    }

    @Override
    @Transactional
    public int delete(PaymentStatus paymentStatus) {
        if (paymentStatus.getCode() == null) return -1;
        PaymentStatus foundedPaymentStatus = findById(paymentStatus.getId());
        if (foundedPaymentStatus == null) return -2;
        else {
            paymentStatusDao.delete(paymentStatus);
            return 1;
        }

    }

    @Override
    public List<PaymentStatus> findByCriteria(PaymentStatusVo vo) {
        String query = "SELECT ps FROM PaymentStatus ps WHHERE 1=1";
        query += SearchUtil.addConstraint("ps", "id", "=", vo.getId());
        query += SearchUtil.addConstraint("ps", "code", "LIKE", vo.getCode());
        query += SearchUtil.addConstraint("ps", "libel", "LIKE", vo.getLibel());
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void delete(List<PaymentStatus> list) {
        if (ListUtil.isNotEmpty(list)) {
            list.parallelStream().map(this::delete).toList();
        }
    }

    @Override
    public void update(List<PaymentStatus> list) {
        if (ListUtil.isNotEmpty(list)) {
            list.parallelStream().map(this::update).toList();
        }
    }

    @Override
    public PaymentStatus findByIdOrCode(PaymentStatus paymentStatus) {
        PaymentStatus result = null;
        if (paymentStatus != null) {
            if (StringUtil.isNotEmpty2(paymentStatus.getId())) {
                result = findById(paymentStatus.getId());
            } else if (StringUtil.isNotEmpty2(paymentStatus.getCode())) {
                result = paymentStatusDao.findByCode(paymentStatus.getCode());
            }
        }
        return result;
    }

    @Override
    public PaymentStatus findByCode(String code) {
        return paymentStatusDao.findByCode(code);
    }
}
