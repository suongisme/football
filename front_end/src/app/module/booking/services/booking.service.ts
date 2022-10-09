import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { Stadium } from "../interfaces/stadium.interface";

@Injectable({
    providedIn: 'root'
})
export class BookingService {

    public bookingResult$: BehaviorSubject<Stadium[]> = new BehaviorSubject(null);

    public searchStadium(formSearch: any): Observable<Stadium[]> {
        return of<Stadium[]>([
            {
                name: 'Sân bóng đá Minh Kiệt Dương Nội - Hà Đông',
                numPeople: 7,
                fromPrice: 400000,
                toPrice: 600000,
                avatar: 'https://thegioithethao.vn/images/products_soccer/2021/01/28/resized/san-bong-minh-kiet-duong-noi-anh6_1611823656.jpg.webp',
                options: [
                    {
                        name: 'Wifi'
                    },
                    {
                        name: 'Cang Tin'
                    }
                ]
            },
            {
                name: 'Sân bóng đá Minh Kiệt Dương Nội - Hà Đông',
                numPeople: 7,
                fromPrice: 400000,
                toPrice: 600000,
                avatar: 'https://thegioithethao.vn/images/products_soccer/2021/01/28/resized/san-bong-minh-kiet-duong-noi-anh6_1611823656.jpg.webp',        
            },
            {
                name: 'Sân bóng đá Minh Kiệt Dương Nội - Hà Đông',
                numPeople: 7,
                fromPrice: 400000,
                toPrice: 600000,
                avatar: 'https://thegioithethao.vn/images/products_soccer/2021/01/28/resized/san-bong-minh-kiet-duong-noi-anh6_1611823656.jpg.webp',        
            },
            {
                name: 'Sân bóng đá Minh Kiệt Dương Nội - Hà Đông',
                numPeople: 7,
                fromPrice: 400000,
                toPrice: 600000,
                avatar: 'https://thegioithethao.vn/images/products_soccer/2021/01/28/resized/san-bong-minh-kiet-duong-noi-anh6_1611823656.jpg.webp',        
            },
            {
                name: 'Sân bóng đá Minh Kiệt Dương Nội - Hà Đông',
                numPeople: 7,
                fromPrice: 400000,
                toPrice: 600000,
                avatar: 'https://thegioithethao.vn/images/products_soccer/2021/01/28/resized/san-bong-minh-kiet-duong-noi-anh6_1611823656.jpg.webp',        
            },
            {
                name: 'Sân bóng đá Minh Kiệt Dương Nội - Hà Đông',
                numPeople: 7,
                fromPrice: 400000,
                toPrice: 600000,
                avatar: 'https://thegioithethao.vn/images/products_soccer/2021/01/28/resized/san-bong-minh-kiet-duong-noi-anh6_1611823656.jpg.webp',        
            }
        ])
    }
}