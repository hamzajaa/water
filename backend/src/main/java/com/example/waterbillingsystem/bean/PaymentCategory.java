package com.example.waterbillingsystem.bean;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;


@Entity
@Getter
@Setter
@Table(name = "PAYMENT_CATEGORY_TABLE")
@NoArgsConstructor
public class PaymentCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String code;
    private BigDecimal unityPrice;
    private BigDecimal dutyEngage;


}
