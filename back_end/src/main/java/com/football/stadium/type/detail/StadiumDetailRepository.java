package com.football.stadium.type.detail;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.persistence.Tuple;
import java.math.BigDecimal;
import java.util.List;

public interface StadiumDetailRepository extends JpaRepository<StadiumDetail, Integer> {

    @Query("SELECT MIN(d.price), MAX(d.price) FROM StadiumDetail d" +
            " JOIN StadiumType t ON d.parentId = t.id" +
            " WHERE t.stadiumId = ?1")
    Tuple findMinAndMAxPriceByStadiumId(String stadiumId);

    List<StadiumDetail> findByParentId(Long parentId);

}