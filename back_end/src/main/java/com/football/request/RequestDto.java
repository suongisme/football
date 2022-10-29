package com.football.request;

import lombok.Data;

import java.io.Serializable;
import java.time.Instant;
import java.util.Date;

/**
 * A DTO for the {@link Request} entity
 */
@Data
public class RequestDto implements Serializable {
    private Integer id;
    private Instant createdDate;
    private String createdBy;
    private Integer status;
    private Boolean hasCompetitor;
    private Long stadiumDetailId;
    private String competitorId;
    private Date hireDate;
}