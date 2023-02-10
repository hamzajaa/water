package com.example.waterbillingsystem.service.util;

import java.time.LocalDate;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateUtil {

    public static LocalDateTime toDate(String string) {
        if (string == null || string.isEmpty()) {
            return null;
        } else {
            string = string.substring(0, 19);
            return LocalDateTime.parse(string, DateTimeFormatter.ISO_LOCAL_DATE_TIME).plusHours(1);
        }
    }

    public static String dateToString(LocalDateTime date) {
        if (date == null) {
            return null;
        } else {
            return String.valueOf(date);
        }
    }
}
