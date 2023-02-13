package com.example.waterbillingsystem.service.admin.facade;

import com.example.waterbillingsystem.bean.Payment;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface PaymentImportExcelService {

    void importExcel(MultipartFile file);
}
