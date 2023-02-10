package com.example.waterbillingsystem.ws.rest.provided.vo;

import com.example.waterbillingsystem.service.util.NumberUtil;
import com.example.waterbillingsystem.service.util.StringUtil;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class ClientVo {

    private String id;
    private String userName;
    private String cni;
    private String counterNumber;
    private String address;
    private String phone;
    private String recordDate;
    private String dutyEngagePrice ;
    private String statusDutyEngagePrice;

    private String recordDateMin;
    private String recordDateMax;

}
