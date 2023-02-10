package com.example.waterbillingsystem.bean;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "CLIENT_TABLE")
@NoArgsConstructor
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String userName;
    private String cni;
    private int counterNumber;
    private String address;
    private String phone;
    private BigDecimal dutyEngagePrice;
    private String statusDutyEngagePrice;
    private LocalDateTime recordDate;
}
