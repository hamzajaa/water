package com.example.waterbillingsystem.service.util;

import java.math.BigDecimal;

public class NumberUtil {

    private static final String CHAIN_VIDE = "";

    public static Long toLong(String string) {
        if (string == null || string.isEmpty()) {
            return 0L;
        } else {
            return Long.parseLong(string);
        }
    }

    public static String toString(Long value) {
        if (value == null) {
            return CHAIN_VIDE;
        } else {
            return String.valueOf(value);
        }
    }

    public static String toString(BigDecimal value) {
        if (value == null) {
            return CHAIN_VIDE;
        } else {
            return String.valueOf(value);
        }
    }

    public static String toString(Integer value) {
        if (value == null) {
            return CHAIN_VIDE;
        } else {
            return String.valueOf(value);
        }
    }

    public static BigDecimal toBigDicimal(String string) {
        if (string == null || string.isEmpty()) {
            return BigDecimal.ZERO;
        } else {
            return new BigDecimal(string);
        }
    }


    public static int toInt(String string) {
        if (string == null || string.isEmpty()) {
            return 0;
        } else {
            return Integer.parseInt(string);
        }
    }
}
