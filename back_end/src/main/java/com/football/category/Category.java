package com.football.category;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "_CATEGORY")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;
}
