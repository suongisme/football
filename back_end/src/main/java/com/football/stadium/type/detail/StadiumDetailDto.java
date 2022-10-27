package com.football.stadium.type.detail;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalTime;

@Data
public class StadiumDetailDto implements Serializable {
    private Integer id;
    private LocalTime startTime;
    private LocalTime endTime;
    private BigDecimal price;
    private Integer parentId;

    private BigDecimal minPrice;
    private BigDecimal maxPrice;

    public StadiumDetailDto(BigDecimal minPrice, BigDecimal maxPrice) {
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
    }
}