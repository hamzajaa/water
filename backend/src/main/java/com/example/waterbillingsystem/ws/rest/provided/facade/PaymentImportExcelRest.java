package com.example.waterbillingsystem.ws.rest.provided.facade;

import com.example.waterbillingsystem.service.admin.impl.PaymentImportExcelImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RequestMapping("api/excel")
@RestController
public class PaymentImportExcelRest {

    @Autowired
    private PaymentImportExcelImpl paymentImportExcelImpl;

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void importExcel(@RequestParam(value = "file") MultipartFile file) {
        paymentImportExcelImpl.importExcel(file);
    }
}
