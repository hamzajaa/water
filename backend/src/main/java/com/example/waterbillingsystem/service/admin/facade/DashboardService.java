package com.example.waterbillingsystem.service.admin.facade;

import java.math.BigDecimal;

public interface DashboardService {

    int clientsCount();

    int expensesCount();

    int paymentsCount();

    int monthlyPayment();

    BigDecimal[] dataStatisticsRevenues();

    BigDecimal[] dataStatisticsRevenusNet();

    BigDecimal[] dataStatisticsExpenses();
    int[] dataStatisticsClients();

    void hh();
}
