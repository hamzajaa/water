package com.example.waterbillingsystem.ws.rest.provided.vo;

import lombok.Getter;
import lombok.Setter;

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
    private Boolean contractualObligation;


    private String recordDateMin;
    private String recordDateMax;

}
