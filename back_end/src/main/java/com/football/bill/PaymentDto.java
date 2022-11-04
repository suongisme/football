package com.football.bill;

import com.football.cart.CartDto;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
public class PaymentDto {
    @NotNull
    private List<CartDto> carts;
}