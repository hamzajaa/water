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
@Table(name = "PAYMENT_TABLE")
@NoArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne
    //    @ManyToOne(fetch = FetchType.LAZY) // it will not fetch the user data while fetching property
    @JoinColumn(name = "CLIENT_ID", nullable = false)
    private Client client;

    private BigDecimal previousNumber;
    private BigDecimal newNumber;
    private BigDecimal consumptionRate;
    private BigDecimal totalPay;
    private LocalDateTime datePay;
    @ManyToOne
    //    @ManyToOne(fetch = FetchType.LAZY) // it will not fetch the user data while fetching property
    @JoinColumn(name = "PAYMENT_CATEGORY_ID", nullable = false)
    private PaymentCategory paymentCategory;
    @ManyToOne
    //@ManyToOne(fetch = FetchType.LAZY) // it will not fetch the user data while fetching property
    @JoinColumn(name = "PAYMENT_STATUS_ID", nullable = false)
    private PaymentStatus paymentStatus;
}
