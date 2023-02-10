package com.example.waterbillingsystem.service.admin.impl;

import com.example.waterbillingsystem.bean.Client;
import com.example.waterbillingsystem.bean.Expenses;
import com.example.waterbillingsystem.bean.Payment;
import com.example.waterbillingsystem.service.admin.facade.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.List;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private EntityManager entityManager;

    @Override
    public int clientsCount() {
        String queryString = "SELECT COUNT(*) FROM Client";
        Query query = entityManager.createQuery(queryString);
        return ((Number) query.getSingleResult()).intValue();
    }

    @Override
    public int expensesCount() {
        String queryString = "SELECT COUNT(*) FROM Expenses ";
        Query query = entityManager.createQuery(queryString);
        return ((Number) query.getSingleResult()).intValue();
    }


    @Override
    public int paymentsCount() {
        String queryString = "SELECT COUNT(*) FROM Payment ";
        Query query = entityManager.createQuery(queryString);
        return ((Number) query.getSingleResult()).intValue();
    }

    @Override
    public int monthlyPayment() {
        String queryString = "SELECT p FROM Payment p";
        Query query = entityManager.createQuery(queryString);
        List<Payment> paymentList = query.getResultList();
        LocalDateTime currentDate = LocalDateTime.now();
        List<Payment> monthlyPaymentList = paymentList.parallelStream().filter(p -> p.getDatePay().getMonth() == currentDate.getMonth()).toList();
        return monthlyPaymentList.size();
    }

    @Override
    public BigDecimal[] dataStatisticsRevenues() {
        String queryString = "SELECT p FROM Payment p";
        Query query = entityManager.createQuery(queryString);
        List<Payment> paymentList = query.getResultList();
        BigDecimal[] values = new BigDecimal[12];
        for (int i = 0; i < values.length; i++) {
            values[i] = new BigDecimal("0.00");
        }

        paymentList.parallelStream().forEach(p -> {
            Month dateMonthPay = p.getDatePay().getMonth();
            BigDecimal totalPay = p.getTotalPay();
            if (dateMonthPay == Month.JANUARY) {
                values[0] = values[0].add(totalPay);
            }
            if (dateMonthPay == Month.FEBRUARY) {
                values[1] = values[1].add(totalPay);
            }
            if (dateMonthPay == Month.MARCH) {
                values[2] = values[2].add(totalPay);
            }
            if (dateMonthPay == Month.APRIL) {
                values[3] = values[3].add(totalPay);
            }
            if (dateMonthPay == Month.MAY) {
                values[4] = values[4].add(totalPay);
            }
            if (dateMonthPay == Month.JUNE) {
                values[5] = values[5].add(totalPay);
            }
            if (dateMonthPay == Month.JULY) {
                values[6] = values[6].add(totalPay);
            }
            if (dateMonthPay == Month.AUGUST) {
                values[7] = values[7].add(totalPay);
            }
            if (dateMonthPay == Month.SEPTEMBER) {
                values[8] = values[8].add(totalPay);
            }
            if (dateMonthPay == Month.OCTOBER) {
                values[9] = values[9].add(totalPay);
            }
            if (dateMonthPay == Month.NOVEMBER) {
                values[10] = values[10].add(totalPay);
            }
            if (dateMonthPay == Month.DECEMBER) {
                values[11] = values[11].add(totalPay);
            }
        });


        return values;
    }

    @Override
    public BigDecimal[] dataStatisticsExpenses() {
        String queryString = "SELECT e FROM Expenses e";
        Query query = entityManager.createQuery(queryString);
        List<Expenses> expensesList = query.getResultList();
        BigDecimal[] values = new BigDecimal[12];
        return getStatisticsExpenses(expensesList, values);
    }

    private BigDecimal[] getStatisticsExpenses(List<Expenses> expensesList, BigDecimal[] values) {
        for (int i = 0; i < values.length; i++) {
            values[i] = new BigDecimal("0.00");
        }
        expensesList.parallelStream().forEach(e -> {
            Month dateMonthExpense = e.getDateExpense().getMonth();
            BigDecimal amount = e.getAmount();
            if (dateMonthExpense == Month.JANUARY) {
                values[0] = values[0].add(amount);
            }
            if (dateMonthExpense == Month.FEBRUARY) {
                values[1] = values[1].add(amount);
            }
            if (dateMonthExpense == Month.MARCH) {
                values[2] = values[2].add(amount);
            }
            if (dateMonthExpense == Month.APRIL) {
                values[3] = values[3].add(amount);
            }
            if (dateMonthExpense == Month.MAY) {
                values[4] = values[4].add(amount);
            }
            if (dateMonthExpense == Month.JUNE) {
                values[5] = values[5].add(amount);
            }
            if (dateMonthExpense == Month.JULY) {
                values[6] = values[6].add(amount);
            }
            if (dateMonthExpense == Month.AUGUST) {
                values[7] = values[7].add(amount);
            }
            if (dateMonthExpense == Month.SEPTEMBER) {
                values[8] = values[8].add(amount);
            }
            if (dateMonthExpense == Month.OCTOBER) {
                values[9] = values[9].add(amount);
            }
            if (dateMonthExpense == Month.NOVEMBER) {
                values[10] = values[10].add(amount);
            }
            if (dateMonthExpense == Month.DECEMBER) {
                values[11] = values[11].add(amount);
            }
        });
        return values;
    }


    @Override
    public BigDecimal[] dataStatisticsRevenusNet() {
        return new BigDecimal[0];
    }

    @Override
    public int[] dataStatisticsClients() {
        String queryString = "SELECT c FROM Client c";
        Query query = entityManager.createQuery(queryString);
        List<Client> clientList = query.getResultList();
        int[] values = new int[12];

        clientList.parallelStream().forEach(c -> {
            Month dateMonthRecord = c.getRecordDate().getMonth();
            if (dateMonthRecord == Month.JANUARY) {
                values[0] += 1;
            }
            if (dateMonthRecord == Month.FEBRUARY) {
                values[1] += 1;
            }
            if (dateMonthRecord == Month.MARCH) {
                values[2] += 1;
            }
            if (dateMonthRecord == Month.APRIL) {
                values[3] += 1;
            }
            if (dateMonthRecord == Month.MAY) {
                values[4] += 1;
            }
            if (dateMonthRecord == Month.JUNE) {
                values[5] += 1;
            }
            if (dateMonthRecord == Month.JULY) {
                values[6] += 1;
            }
            if (dateMonthRecord == Month.AUGUST) {
                values[7] += 1;
            }
            if (dateMonthRecord == Month.SEPTEMBER) {
                values[8] += 1;
            }
            if (dateMonthRecord == Month.OCTOBER) {
                values[9] += 1;
            }
            if (dateMonthRecord == Month.NOVEMBER) {
                values[10] += 1;
            }
            if (dateMonthRecord == Month.DECEMBER) {
                values[11] += 1;
            }
        });
        return values;
    }

    @Override
    public void hh() {

//        BigDecimal[] values = new BigDecimal[12];
//        for (int i = 0; i < values.length; i++) {
//            values[i] = new BigDecimal("0.00");
//        }
//
//        for (int i = 0; i < values.length; i++) {
//
//
//            for (BigDecimal bigDecimal : this.dataStatisticsRevenues()) {
//                for (BigDecimal decimal : this.dataStatisticsExpenses()) {
//                    values[i] = bigDecimal.subtract(decimal);
//                    break;
//                }
//                break;
//            }
//        }
    }
}
