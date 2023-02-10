package com.example.waterbillingsystem.ws.rest.provided.vo;

import com.example.waterbillingsystem.bean.Client;
import com.example.waterbillingsystem.bean.PaymentStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentVo {

    private String id;
    private String previousNumber;
    private String newNumber;
    private String consumptionRate;
    private String totalPay;
    private String datePay;
    private String datePayMin;
    private String datePayMax;
    private PaymentCategoryVo paymentCategoryVo;
    private PaymentStatusVo paymentStatusVo;
    private ClientVo clientVo;

}
