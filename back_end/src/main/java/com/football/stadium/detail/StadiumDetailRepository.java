package com.football.stadium.detail;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StadiumDetailRepository extends JpaRepository<StadiumDetail, Long> {

    List<StadiumDetail> findByStadiumId(String stadiumId);
}