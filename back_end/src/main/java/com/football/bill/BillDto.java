package com.football.bill;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * A DTO for the {@link Bill} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BillDto implements Serializable {
    private String id;
    private String username;
    private Date createdDate;
    private BigDecimal total;
    private Integer status;
}