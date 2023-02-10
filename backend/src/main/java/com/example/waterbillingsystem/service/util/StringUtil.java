package com.example.waterbillingsystem.service.util;

public class StringUtil {

    public static boolean isEmpty(String string) {
        return string == null || string.isEmpty();
    }


    public static boolean isNotEmpty(Object value) {
        if (value != null) {
            return value != null || isEmpty(value.toString());
        } else {
            return value != null;
        }
    }

    public static boolean isNotEmpty2(Object value) {
        boolean b = false;
        if (value != null) {
            if (!value.toString().isEmpty()) {
                b = true;
            } else {
                b = false;
            }
        }
        return b;
    }
}
