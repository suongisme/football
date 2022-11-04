package com.football.bill;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum BillStatus {

    PENDING(0), APPROVE(1), REJECT(2), CANCEL(3);

    final Integer status;
}
