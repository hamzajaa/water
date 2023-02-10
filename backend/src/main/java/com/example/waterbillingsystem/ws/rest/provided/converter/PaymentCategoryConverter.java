package com.example.waterbillingsystem.ws.rest.provided.converter;

import com.example.waterbillingsystem.bean.PaymentCategory;
import com.example.waterbillingsystem.service.util.NumberUtil;
import com.example.waterbillingsystem.service.util.StringUtil;
import com.example.waterbillingsystem.ws.rest.provided.vo.PaymentCategoryVo;
import org.springframework.stereotype.Component;

@Component
public class PaymentCategoryConverter extends AbstractConverter<PaymentCategory, PaymentCategoryVo> {
    @Override
    public PaymentCategory toEntity(PaymentCategoryVo vo) {
        if (vo == null) {
            return null;
        } else {
            PaymentCategory paymentCategoryEntity = new PaymentCategory();

            if (StringUtil.isNotEmpty2(vo.getId())) {
                paymentCategoryEntity.setId(NumberUtil.toLong(vo.getId()));
            }
            if (StringUtil.isNotEmpty2(vo.getCode())) {
                paymentCategoryEntity.setCode(vo.getCode());
            }
            if (StringUtil.isNotEmpty2(vo.getUnityPrice())) {
                paymentCategoryEntity.setUnityPrice(NumberUtil.toBigDicimal(vo.getUnityPrice()));
            }
            if (StringUtil.isNotEmpty2(vo.getDutyEngage())) {
                paymentCategoryEntity.setDutyEngage(NumberUtil.toBigDicimal(vo.getDutyEngage()));
            }

            return paymentCategoryEntity;
        }
    }

    @Override
    public PaymentCategoryVo toVo(PaymentCategory entity) {
        if (entity == null) {
            return null;
        } else {
            PaymentCategoryVo paymentCategoryVo = new PaymentCategoryVo();

            if (entity.getId() != null) {
                paymentCategoryVo.setId(NumberUtil.toString(entity.getId()));
            }
            if (StringUtil.isNotEmpty2(entity.getCode())) {
                paymentCategoryVo.setCode(entity.getCode());
            }
            if (entity.getUnityPrice() != null) {
                paymentCategoryVo.setUnityPrice(NumberUtil.toString(entity.getUnityPrice()));
            }
            if (entity.getDutyEngage() != null) {
                paymentCategoryVo.setDutyEngage(NumberUtil.toString(entity.getDutyEngage()));
            }

            return paymentCategoryVo;
        }
    }
}
