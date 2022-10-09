import { CurrencyPipe } from '@angular/common';
import { Time } from './../../interfaces/time.interface';
import { CoreColumn } from './../../../../core/interfaces/column.interface';
import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-time-table-component',
    templateUrl: './time-table.component.html',
    styleUrls: ['./time-table.component.scss']
})
export class TimeTableComponent implements OnInit {

    public columns: CoreColumn[];
    public rows: Time[];

    constructor(
        private currencyPipe: CurrencyPipe
    ) {}

    public ngOnInit(): void {
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

}