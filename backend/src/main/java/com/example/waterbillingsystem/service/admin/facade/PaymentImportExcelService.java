package com.example.waterbillingsystem.service.admin.facade;

import org.springframework.web.multipart.MultipartFile;


public interface PaymentImportExcelService {

    void importExcel(MultipartFile file);
}
