package com.football.bill.detail;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BillDetailRepository extends JpaRepository<BillDetail, Long> {

    List<BillDetail> findByBillId(String billId);
}