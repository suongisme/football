package com.football.stadium.option;

import lombok.Data;

import java.io.Serializable;

/**
 * A DTO for the {@link StadiumOption} entity
 */
@Data
public class StadiumOptionDto implements Serializable {
    private final Integer id;
    private final String name;
    private final String stadiumId;
}