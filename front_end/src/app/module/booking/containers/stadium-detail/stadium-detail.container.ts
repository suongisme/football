import { Time } from './../../interfaces/time.interface';
import { BreadscrumService } from './../../../../layout/main/services/breadcrum.service';
import { CurrencyPipe } from '@angular/common';
import { CoreColumn } from './../../../../core/interfaces/column.interface';
import { BookingService } from './../../services/booking.service';
import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-stadium-detail-container',
    templateUrl: './stadium-detail.container.html',
    styleUrls: ['./stadium-detail.container.scss']
})
export class StadiumDetailContainer implements OnInit {
    
    isReadMore: boolean = false;
    public columns: CoreColumn[];
    public rows: Time[];

    constructor(
        private bookingService: BookingService,
        private currencyPipe: CurrencyPipe,
        private breadscrumService: BreadscrumService
    ) {}

   
    public ngOnInit(): void {
        this.setBreadscum();
        this.bookingService.searchStadium(null)
            .subscribe(result => this.bookingService.bookingResult$.next(result));
            this.columns = [
                {
                    headerName: 'Thời gian',
                    field: 'time',
                },
                {
                    headerName: 'Giá',
                    cellStyle: {
                        'font-weight': 'bold'
                    },
                    valueGetter: time => {
                        return this.currencyPipe.transform(time.price, 'VND');
                    }
                },
                {
                    valueGetter: time => {
                        const price = this.currencyPipe.transform(time.price, 'VND');
                        console.log(price); 
                        return price;
                    }
                }
            ]
    
            this.rows = [
                {
                    time: 'Từ 16h00 - 17h30',
                    price: 600000,
                },
                {
                    time: 'Từ 16h00 - 17h30',
                    price: 600000,
                }
            ]
    }

    private setBreadscum(): void {
        this.breadscrumService.breadscrum$.next([
            {
                value: 'Sân bóng đá'
            },
            {
                value: 'Hà Nội'
            },
            {
                value: 'Đông Anh'
            }
        ])
    }

}