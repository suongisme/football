package com.football.bill;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Data
@Entity
@Table(name = "_BILL")
public class Bill {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "username")
    private String username;

    @Column(name = "created_date")
    private Date createdDate;

    @Column(name = "total")
    private BigDecimal total;

    @Column(name = "status")
    private Integer status;
}
