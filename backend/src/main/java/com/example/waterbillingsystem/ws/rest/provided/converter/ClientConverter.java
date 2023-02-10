package com.example.waterbillingsystem.ws.rest.provided.converter;

import com.example.waterbillingsystem.bean.Client;
import com.example.waterbillingsystem.service.util.DateUtil;
import com.example.waterbillingsystem.service.util.NumberUtil;
import com.example.waterbillingsystem.service.util.StringUtil;
import com.example.waterbillingsystem.ws.rest.provided.vo.ClientVo;
import org.springframework.stereotype.Component;

@Component
public class ClientConverter extends AbstractConverter<Client, ClientVo> {

    @Override
    public Client toEntity(ClientVo vo) {
        if (vo == null) {
            return null;
        } else {
            Client clientEntity = new Client();

            if (StringUtil.isNotEmpty2(vo.getId())) {
                clientEntity.setId(NumberUtil.toLong(vo.getId()));
            }
            if (StringUtil.isNotEmpty2(vo.getUserName())) {
                clientEntity.setUserName(vo.getUserName());
            }
            if (StringUtil.isNotEmpty2(vo.getCni())) {
                clientEntity.setCni(vo.getCni());
            }
            if (StringUtil.isNotEmpty2(vo.getCounterNumber())) {
                clientEntity.setCounterNumber(NumberUtil.toInt(vo.getCounterNumber()));
            }
            if (StringUtil.isNotEmpty2(vo.getAddress())) {
                clientEntity.setAddress(vo.getAddress());
            }
            if (StringUtil.isNotEmpty2(vo.getDutyEngagePrice())) {
                clientEntity.setDutyEngagePrice(NumberUtil.toBigDicimal(vo.getDutyEngagePrice()));
            }
            if (StringUtil.isNotEmpty2(vo.getPhone())) {
                clientEntity.setPhone(vo.getPhone());
            }
            if (StringUtil.isNotEmpty2(vo.getStatusDutyEngagePrice())) {
                clientEntity.setStatusDutyEngagePrice(vo.getStatusDutyEngagePrice());
            }
            if (StringUtil.isNotEmpty2(vo.getContractualObligation())) {
                clientEntity.setContractualObligation(vo.getContractualObligation());
            }
            if (StringUtil.isNotEmpty2(vo.getRecordDate())) {
                clientEntity.setRecordDate(DateUtil.toDate(vo.getRecordDate()));
            }

            return clientEntity;
        }
    }

    @Override
    public ClientVo toVo(Client entity) {

        if (entity == null) {
            return null;
        } else {
            ClientVo clientVo = new ClientVo();

            if (entity.getId() != null) {
                clientVo.setId(NumberUtil.toString(entity.getId()));
            }
            if (StringUtil.isNotEmpty2(entity.getUserName())) {
                clientVo.setUserName(entity.getUserName());
            }
            if (StringUtil.isNotEmpty2(entity.getCni())) {
                clientVo.setCni(entity.getCni());
            }
            if (StringUtil.isNotEmpty2(entity.getCounterNumber())) {
                clientVo.setCounterNumber(NumberUtil.toString(entity.getCounterNumber()));
            }
            if (StringUtil.isNotEmpty2(entity.getAddress())) {
                clientVo.setAddress(entity.getAddress());
            }
            if (entity.getDutyEngagePrice() != null) {
                clientVo.setDutyEngagePrice(NumberUtil.toString(entity.getDutyEngagePrice()));
            }
            if (StringUtil.isNotEmpty2(entity.getPhone())) {
                clientVo.setPhone(entity.getPhone());
            }
            if (StringUtil.isNotEmpty2(entity.getStatusDutyEngagePrice())) {
                clientVo.setStatusDutyEngagePrice(entity.getStatusDutyEngagePrice());
            }
            if (entity.getContractualObligation() != null) {
                clientVo.setContractualObligation(entity.getContractualObligation());
            }
            if (entity.getRecordDate() != null) {
                clientVo.setRecordDate(DateUtil.dateToString(entity.getRecordDate()));
            }

            return clientVo;
        }
    }
}
