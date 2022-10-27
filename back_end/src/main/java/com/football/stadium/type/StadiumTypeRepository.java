package com.football.stadium.type;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StadiumTypeRepository extends JpaRepository<StadiumType, Long> {

    List<StadiumType> findByStadiumId(String stadiumId);
}