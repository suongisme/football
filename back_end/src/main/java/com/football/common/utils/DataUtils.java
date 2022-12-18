package com.football.common.utils;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.Locale;
import java.util.Objects;

public class DataUtils {

    private static final Locale vn = new Locale("vi", "VN");
    private static final NumberFormat vndFormat = NumberFormat.getCurrencyInstance(vn);

    public static String resolveKeySearch(String keySearch) {
        if (Objects.isNull(keySearch)) return "%%";
        return "%" + keySearch + "%";
    }

    public static String formatVndCurrency(BigDecimal bigDecimal) {
        return vndFormat.format(bigDecimal);
    }

}
