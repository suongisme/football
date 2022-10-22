package com.football.stadium;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StadiumRepository extends JpaRepository<Stadium, String> {

    @Query(
        "SELECT stadium FROM Stadium stadium" +
        " WHERE (:provinceId IS NULL OR stadium.provinceId = :provinceId)" +
        " AND (:districtId IS NULL OR stadium.districtId = :districtId)" +
        " AND (:name IS NULL OR stadium.name LIKE :name)" +
        " AND (:owner IS NULL OR stadium.createdBy = :owner)"
    )
    List<Stadium> findStadium(
        @Param("provinceId") Long provinceId,
        @Param("districtId") Long districtId,
        @Param("name") String name,
        @Param("owner") String owner,
        Pageable pageable
    );
}
