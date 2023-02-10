package com.example.waterbillingsystem.ws.rest.provided.converter;

import com.example.waterbillingsystem.bean.Client;
import com.example.waterbillingsystem.bean.PaymentStatus;
import com.example.waterbillingsystem.service.util.NumberUtil;
import com.example.waterbillingsystem.service.util.StringUtil;
import com.example.waterbillingsystem.ws.rest.provided.vo.ClientVo;
import com.example.waterbillingsystem.ws.rest.provided.vo.PaymentStatusVo;
import org.springframework.stereotype.Component;

@Component
public class PaymentStatusConverter extends AbstractConverter<PaymentStatus, PaymentStatusVo> {

    @Override
    public PaymentStatus toEntity(PaymentStatusVo vo) {
        if (vo == null) {
            return null;
        } else {
            PaymentStatus paymentStatusEntity = new PaymentStatus();

            if (StringUtil.isNotEmpty2(vo.getId())) {
                paymentStatusEntity.setId(NumberUtil.toLong(vo.getId()));
            }
            if (StringUtil.isNotEmpty2(vo.getCode())) {
                paymentStatusEntity.setCode(vo.getCode());
            }
            if (StringUtil.isNotEmpty2(vo.getLibel())) {
                paymentStatusEntity.setLibel(vo.getLibel());
            }

            return paymentStatusEntity;
        }
    }

    @Override
    public PaymentStatusVo toVo(PaymentStatus entity) {
        if (entity == null) {
            return null;
        } else {
            PaymentStatusVo paymentStatusVo = new PaymentStatusVo();

            if (entity.getId() != null) {
                paymentStatusVo.setId(NumberUtil.toString(entity.getId()));
            }
            if (StringUtil.isNotEmpty2(entity.getCode())) {
                paymentStatusVo.setCode(entity.getCode());
            }
            if (StringUtil.isNotEmpty2(entity.getLibel())) {
                paymentStatusVo.setLibel(entity.getLibel());
            }

            return paymentStatusVo;
        }
    }
}
