package com.example.waterbillingsystem.ws.rest.provided.converter;

import com.example.waterbillingsystem.bean.Payment;
import com.example.waterbillingsystem.service.util.DateUtil;
import com.example.waterbillingsystem.service.util.NumberUtil;
import com.example.waterbillingsystem.service.util.StringUtil;
import com.example.waterbillingsystem.ws.rest.provided.vo.PaymentStatusVo;
import com.example.waterbillingsystem.ws.rest.provided.vo.PaymentVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PaymentConverter extends AbstractConverter<Payment, PaymentVo> {

    @Autowired
    private ClientConverter clientConverter;
    @Autowired
    private PaymentStatusConverter paymentStatusConverter;
    @Autowired
    private PaymentCategoryConverter paymentCategoryConverter;

    @Override
    public Payment toEntity(PaymentVo vo) {
        if (vo == null) {
            return null;
        } else {
            Payment paymentEntity = new Payment();

            if (StringUtil.isNotEmpty2(vo.getId())) {
                paymentEntity.setId(NumberUtil.toLong(vo.getId()));
            }
            if (StringUtil.isNotEmpty2(vo.getPreviousNumber())) {
                paymentEntity.setPreviousNumber(NumberUtil.toBigDicimal(vo.getPreviousNumber()));
            }
            if (StringUtil.isNotEmpty2(vo.getNewNumber())) {
                paymentEntity.setNewNumber(NumberUtil.toBigDicimal(vo.getNewNumber()));
            }
            if (StringUtil.isNotEmpty2(vo.getConsumptionRate())) {
                paymentEntity.setConsumptionRate(NumberUtil.toBigDicimal(vo.getConsumptionRate()));
            }
            if (StringUtil.isNotEmpty2(vo.getTotalPay())) {
                paymentEntity.setTotalPay(NumberUtil.toBigDicimal(vo.getTotalPay()));
            }
            if (StringUtil.isNotEmpty2(vo.getDatePay())) {
                paymentEntity.setDatePay(DateUtil.toDate(vo.getDatePay()));
            }
            if (StringUtil.isNotEmpty2(vo.getDatePay())) {
                paymentEntity.setDatePay(DateUtil.toDate(vo.getDatePay()));
            }
            if (vo.getClientVo() != null) {
                paymentEntity.setClient(clientConverter.toEntity(vo.getClientVo()));
            }

            if (vo.getPaymentCategoryVo() != null) {
                paymentEntity.setPaymentCategory(paymentCategoryConverter.toEntity(vo.getPaymentCategoryVo()));
            }
            if (vo.getPaymentStatusVo() != null) {
                paymentEntity.setPaymentStatus(paymentStatusConverter.toEntity(vo.getPaymentStatusVo()));
            }

            return paymentEntity;
        }
    }

    @Override
    public PaymentVo toVo(Payment entity) {
        if (entity == null) {
            return null;
        } else {
            PaymentVo paymentVo = new PaymentVo();

            if (entity.getId() != null) {
                paymentVo.setId(NumberUtil.toString(entity.getId()));
            }
            if (entity.getPreviousNumber() != null) {
                paymentVo.setPreviousNumber(NumberUtil.toString(entity.getPreviousNumber()));
            }
            if (entity.getNewNumber() != null) {
                paymentVo.setNewNumber(NumberUtil.toString(entity.getNewNumber()));
            }
            if (entity.getConsumptionRate() != null) {
                paymentVo.setConsumptionRate(NumberUtil.toString(entity.getConsumptionRate()));
            }
            if (entity.getTotalPay() != null) {
                paymentVo.setTotalPay(NumberUtil.toString(entity.getTotalPay()));
            }
            if (entity.getDatePay() != null) {
                paymentVo.setDatePay(DateUtil.dateToString(entity.getDatePay()));
            }
            if (entity.getClient() != null) {
                paymentVo.setClientVo(clientConverter.toVo(entity.getClient()));
            }
            if (entity.getPaymentCategory() != null) {
                paymentVo.setPaymentCategoryVo(paymentCategoryConverter.toVo(entity.getPaymentCategory()));
            }
            if (entity.getPaymentStatus() != null) {
                paymentVo.setPaymentStatusVo(paymentStatusConverter.toVo(entity.getPaymentStatus()));
            }

            return paymentVo;
        }
    }
}
