package com.football.stadium.detail;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalTime;

@Data
@Entity
@Table(name = "_STADIUM_DETAIL")
public class StadiumDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @Column(name = "price", nullable = false, precision = 10)
    private BigDecimal price;

    @Column(name = "stadium_id")
    private String stadiumId;
}