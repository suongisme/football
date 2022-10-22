package com.football.stadium.detail;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalTime;

/**
 * A DTO for the {@link StadiumDetail} entity
 */
@Data
public class StadiumDetailDto implements Serializable {
    private final Long id;
    private final String name;
    private final LocalTime startTime;
    private final LocalTime endTime;
    private final BigDecimal price;
}