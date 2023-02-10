package com.example.waterbillingsystem.ws.rest.provided.facade;

import com.example.waterbillingsystem.service.admin.facade.ClientService;
import com.example.waterbillingsystem.service.admin.facade.DashboardService;
import com.example.waterbillingsystem.service.admin.facade.ExpensesService;
import com.example.waterbillingsystem.service.admin.facade.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RequestMapping("api/admin/dashboard")
@RestController
public class DashboardRestAdmin {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/clients")
    public int clientsCount() {
        return dashboardService.clientsCount();
    }

    @GetMapping("/expenses")
    public int expensesCount() {
        return dashboardService.expensesCount();
    }

    @GetMapping("/payments")
    public int paymentsCount() {
        return dashboardService.paymentsCount();
    }

    @GetMapping("/monthly-payment")
    public int monthlyPayment() {
        return dashboardService.monthlyPayment();
    }

    @GetMapping("/data-statistics-revenues")
    public BigDecimal[] dataStatisticsRevenues() {
        return dashboardService.dataStatisticsRevenues();
    }

    @GetMapping("/data-statistics-expenses")
    public BigDecimal[] dataStatisticsExpenses() {
        return dashboardService.dataStatisticsExpenses();
    }

    public BigDecimal[] dataStatisticsRevenusNet() {
        return dashboardService.dataStatisticsRevenusNet();
    }

    @GetMapping("/data-statistics-clients")
    public int[] dataStatisticsClients() {
        return dashboardService.dataStatisticsClients();
    }

    @GetMapping("/data")
    public void hh() {
        dashboardService.hh();
    }
}
