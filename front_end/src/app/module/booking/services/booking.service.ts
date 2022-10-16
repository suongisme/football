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
                name: 'Sân bóng đá mini Bế Văn Đàn Đà Nẵng',
                flag: 'san-bong-da-mini-be-van-dan-da-nang',
                numPeople: 7,
                fromPrice: 400000,
                toPrice: 600000,
                province: 'Đà Nẵng',
                district: '',
                avatar: 'https://lh5.googleusercontent.com/p/AF1QipMgz_2mrla0ccra_jhRTMRiAv8byKdDvSaRV30L=w493-h240-k-no',
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
                name: 'Sân bóng đá mini Bế Văn Đàn Đà Nẵng',
                numPeople: 7,
                fromPrice: 400000,
                toPrice: 600000,
                avatar: 'https://lh5.googleusercontent.com/p/AF1QipMgz_2mrla0ccra_jhRTMRiAv8byKdDvSaRV30L=w493-h240-k-no',        
            },
            {
                name: 'Sân bóng đá mini Bế Văn Đàn Đà Nẵng',
                numPeople: 7,
                fromPrice: 400000,
                toPrice: 600000,
                avatar: 'https://lh5.googleusercontent.com/p/AF1QipMgz_2mrla0ccra_jhRTMRiAv8byKdDvSaRV30L=w493-h240-k-no',        
            },
            {
                name: 'Sân bóng đá mini Bế Văn Đàn Đà Nẵng',
                numPeople: 7,
                fromPrice: 400000,
                toPrice: 600000,
                avatar: 'https://lh5.googleusercontent.com/p/AF1QipMgz_2mrla0ccra_jhRTMRiAv8byKdDvSaRV30L=w493-h240-k-no',        
            },
            {
                name: 'Sân bóng đá mini Bế Văn Đàn Đà Nẵng',
                numPeople: 7,
                fromPrice: 400000,
                toPrice: 600000,
                avatar: 'https://lh5.googleusercontent.com/p/AF1QipMgz_2mrla0ccra_jhRTMRiAv8byKdDvSaRV30L=w493-h240-k-no',        
            },
            {
                name: 'Sân bóng đá mini Bế Văn Đàn Đà Nẵng',
                numPeople: 7,
                fromPrice: 400000,
                toPrice: 600000,
                avatar: 'https://lh5.googleusercontent.com/p/AF1QipMgz_2mrla0ccra_jhRTMRiAv8byKdDvSaRV30L=w493-h240-k-no',        
            }
        ])
    }
}