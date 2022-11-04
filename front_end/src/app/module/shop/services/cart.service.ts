import { RequestPagination } from './../../../core/interfaces/paginator.interface';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { ResponsePagination } from 'src/app/core/interfaces/paginator.interface';
import { Cart } from '../interfaces/cart.interface';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private url: string = `${environment.apiUrl}/carts`

    constructor(
        private http: HttpClient,
        private spinnerService: SpinnerService,
    ) {}

    public getMyCart(dataSearch: RequestPagination<Cart>): Observable<ResponsePagination<Cart[]>> {
        this.spinnerService.show();
        return this.http.post<ResponsePagination<Cart[]>>(`${this.url}/mine`, dataSearch);
    }

    public addToCart(cart: Cart): Observable<any> {
        this.spinnerService.show();
        return this.http.post<any>(`${this.url}/add-to-cart`, cart);

    }

    public plusQuantity(cartId: number): Observable<any> {
        this.spinnerService.show();
        return this.http.get(`${this.url}/plus/${cartId}`)
    }

    public subtractQuantity(cartId: number): Observable<any> {
        this.spinnerService.show();
        return this.http.get(`${this.url}/subtract/${cartId}`);
    }
}