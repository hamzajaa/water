package com.example.waterbillingsystem.service.admin.impl;

import com.example.waterbillingsystem.bean.Client;
import com.example.waterbillingsystem.bean.Payment;
import com.example.waterbillingsystem.bean.PaymentCategory;
import com.example.waterbillingsystem.bean.PaymentStatus;
import com.example.waterbillingsystem.service.admin.facade.*;
import com.example.waterbillingsystem.service.util.DateUtil;
import com.example.waterbillingsystem.service.util.NumberUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class PaymentImportExcelImpl implements PaymentImportExcelService {
    @Autowired
    private PaymentService paymentService;
    @Autowired
    private ClientService clientService;
    @Autowired
    private PaymentCategoryService paymentCategoryService;
    @Autowired
    private PaymentStatusService paymentStatusService;

    @Override
    public void importExcel(MultipartFile file) {

        try {
            // Read data from Excel file
            Workbook workbook = WorkbookFactory.create(file.getInputStream());
            Sheet sheet = workbook.getSheetAt(0);

            // Iterate through each row in the sheet

            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);

                // Read data from the row
                String previousNumberString = String.valueOf(row.getCell(0));
                String newNumberString = String.valueOf(row.getCell(1));
                String datePayString = String.valueOf(row.getCell(2));
                String clientUserName = String.valueOf(row.getCell(3));
                String paymentCategoryCode = String.valueOf(row.getCell(4));
                String paymentStatusCode = String.valueOf(row.getCell(5));
                // convert data
                BigDecimal previousNumber = NumberUtil.toBigDicimal(previousNumberString);
                BigDecimal newNumber = NumberUtil.toBigDicimal(newNumberString);
                LocalDateTime datePay = DateUtil.toDate(datePayString);
                // find Client
                Client loadedClient = clientService.findByUserName(clientUserName);
                Client client = new Client();
                if (loadedClient == null) {
                    return;
                } else {
                    client.setId(loadedClient.getId());
                    client.setUserName(loadedClient.getUserName());
                    client.setCni(loadedClient.getCni());
                    client.setPhone(loadedClient.getPhone());
                    client.setAddress(loadedClient.getAddress());
                    client.setCounterNumber(loadedClient.getCounterNumber());
                    client.setDutyEngagePrice(loadedClient.getDutyEngagePrice());
                    client.setStatusDutyEngagePrice(loadedClient.getStatusDutyEngagePrice());
                    client.setRecordDate(loadedClient.getRecordDate());
                }
                //find PaymentCategory
                PaymentCategory loadedPaymentCategory = paymentCategoryService.findByCode(paymentCategoryCode);
                PaymentCategory paymentCategory = new PaymentCategory();
                if (loadedPaymentCategory == null) {
                    return;
                } else {
                    paymentCategory.setId(loadedPaymentCategory.getId());
                    paymentCategory.setCode(loadedPaymentCategory.getCode());
                    paymentCategory.setUnityPrice(loadedPaymentCategory.getUnityPrice());
                    paymentCategory.setDutyEngage(loadedPaymentCategory.getDutyEngage());
                }
                //find PaymentCategory
                PaymentStatus loadedPaymentStatus = paymentStatusService.findByCode(paymentStatusCode);
                PaymentStatus paymentStatus = new PaymentStatus();
                if (loadedPaymentStatus == null) {
                    return;
                } else {
                    paymentStatus.setId(loadedPaymentStatus.getId());
                    paymentStatus.setLibel(loadedPaymentStatus.getLibel());
                    paymentStatus.setCode(loadedPaymentStatus.getCode());
                }
                // set Data
                Payment payment = new Payment();
                payment.setPreviousNumber(previousNumber);
                payment.setNewNumber(newNumber);
                payment.setDatePay(datePay);
                payment.setClient(client);
                payment.setPaymentCategory(paymentCategory);
                payment.setPaymentStatus(paymentStatus);

//                // Save data to the database
                paymentService.save(payment);
            }
//            paymentService.save(paymentList);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
