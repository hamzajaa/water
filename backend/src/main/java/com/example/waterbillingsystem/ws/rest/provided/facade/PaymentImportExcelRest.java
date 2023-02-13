package com.example.waterbillingsystem.ws.rest.provided.facade;

import com.example.waterbillingsystem.bean.Payment;
import com.example.waterbillingsystem.service.admin.facade.PaymentImportExcelService;
import com.example.waterbillingsystem.service.admin.impl.PaymentImportExcelImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RequestMapping("api/excel")
@RestController
public class PaymentImportExcelRest {

    @Autowired
    private PaymentImportExcelService paymentImportExcelService;

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void importExcel(@RequestParam(value = "file") MultipartFile file) {
        paymentImportExcelService.importExcel(file);
    }
}
