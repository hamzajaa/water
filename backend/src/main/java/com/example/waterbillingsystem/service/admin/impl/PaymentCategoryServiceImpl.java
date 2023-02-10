package com.example.waterbillingsystem.service.admin.impl;

import com.example.waterbillingsystem.bean.PaymentCategory;
import com.example.waterbillingsystem.dao.ClientDao;
import com.example.waterbillingsystem.dao.PaymentCategoryDao;
import com.example.waterbillingsystem.service.admin.facade.PaymentCategoryService;
import com.example.waterbillingsystem.service.util.ListUtil;
import com.example.waterbillingsystem.service.util.SearchUtil;
import com.example.waterbillingsystem.ws.rest.provided.vo.PaymentCategoryVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
public class PaymentCategoryServiceImpl implements PaymentCategoryService {

    @Autowired
    PaymentCategoryDao paymentCategoryDao;
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private ClientDao clientDao;

    @Override
    public List<PaymentCategory> findAll() {
        return paymentCategoryDao.findAll();
    }

    @Override
    public PaymentCategory findById(Long id) {
        if (id == null) {
            return null;
        } else {
            return paymentCategoryDao.getOne(id);
        }
    }

    @Override
    public PaymentCategory findByIdWithAssociatedList(Long id) {
        return findById(id);
    }

    @Override
    @Transactional
    public int deleteById(Long id) {
        int res = 0;
        if (paymentCategoryDao.findById(id).isPresent()) {
            paymentCategoryDao.deleteById(id);
            res = 1;
        }
        return res;
    }

    @Override
    public PaymentCategory save(PaymentCategory paymentCategory) {
        PaymentCategory loadedPaymentCategory = paymentCategoryDao.findByCode(paymentCategory.getCode());
        PaymentCategory result = null;
        if (loadedPaymentCategory == null) {
            result = paymentCategoryDao.save(paymentCategory);
        }
        return result;
    }

    @Override
    public List<PaymentCategory> save(List<PaymentCategory> list) {
        List<PaymentCategory> paymentCategoryList = new ArrayList<>();
        return list.stream().filter(ct -> paymentCategoryList.add(save(ct))).toList();
    }

    @Override
    public PaymentCategory update(PaymentCategory paymentCategory) {
        PaymentCategory loadedPaymentCategory = findById(paymentCategory.getId());
        PaymentCategory result = null;
        if (loadedPaymentCategory != null) {
            result = paymentCategoryDao.save(paymentCategory);
        }
        return result;
    }

    @Override
    @Transactional
    public int delete(PaymentCategory paymentCategory) {
        if (paymentCategory.getCode() == null) return -1;
        PaymentCategory foundedPaymentCategory = findById(paymentCategory.getId());
        if (foundedPaymentCategory == null) return -2;
        else {
            paymentCategoryDao.delete(paymentCategory);
            return 1;
        }

    }

    @Override
    public List<PaymentCategory> findByCriteria(PaymentCategoryVo vo) {
        String query = "SELECT c FROM PaymentCategory c WHERE 1=1";
        query += SearchUtil.addConstraint("c", "id", "=", vo.getId());
        query += SearchUtil.addConstraint("c", "code", "LIKE", vo.getCode());
        query += SearchUtil.addConstraint("c", "unityPrice", "=", vo.getUnityPrice());
        query += SearchUtil.addConstraint("c", "dutyEngage", "=", vo.getDutyEngage());
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    @Transactional
    public void delete(List<PaymentCategory> list) {
        if (ListUtil.isNotEmpty(list)) {
            list.forEach(ct -> paymentCategoryDao.delete(ct));
            //categoryDao.deleteAll(list);
        }
    }

    @Override
    public void update(List<PaymentCategory> list) {
        List<PaymentCategory> paymentCategoryList = new ArrayList<>();
        if (ListUtil.isNotEmpty(list)) {
            list.stream().map(ct -> paymentCategoryList.add(update(ct))).toList();
        }
    }

    @Override
    public PaymentCategory findByCode(String code) {
        return paymentCategoryDao.findByCode(code);
    }
}
