package com.football.request;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface RequestRepository extends JpaRepository<Request, Long> {

    @Query(nativeQuery = true,
            value = "SELECT * FROM _REQUEST " +
                    " WHERE stadium_detail_id = ?1" +
                    " AND hire_date = ?2" +
                    " AND status = 1")
    Optional<Request> findApprovedByStadiumDetailIdAndHireDate(Long stadiumDetailId, String hireDate);

    boolean existsByStadiumDetailIdAndHireDateAndStatus(Long stadiumDetailId, Date hireDate, Integer status);

    @Query("SELECT new com.football.request.PendingRequestDto(s, t, d, r) FROM Request r" +
            " JOIN StadiumDetail d ON d.id = r.stadiumDetailId" +
            " JOIN StadiumType t ON t.id = d.parentId" +
            " JOIN Stadium s ON s.id = t.stadiumId" +
            " WHERE s.id = ?1 AND r.status = 1")
    List<PendingRequestDto> findStadiumRequest(String stadiumId);

    @Query(nativeQuery = true, value = "SELECT * FROM _REQUEST WHERE hire_date = ?1 AND stadium_detail_id = ?2")
    List<Request> findAllByHireDateAndStadiumDetailId(String hireDate, Long stadiumDetailId);
}