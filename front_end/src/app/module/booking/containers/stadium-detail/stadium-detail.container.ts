import { Tree } from 'src/app/core/interfaces/table.interface';
import { Time } from './../../interfaces/time.interface';
import { CurrencyPipe } from '@angular/common';
import { BookingService } from './../../services/booking.service';
import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-stadium-detail-container',
  templateUrl: './stadium-detail.container.html',
  styleUrls: ['./stadium-detail.container.scss'],
})
export class StadiumDetailContainer implements OnInit {
  isReadMore: boolean = false;
  public columns: ColDef[];
  public autoGroupColumnDef: ColDef;
  public rows: Tree<Time>[];

  constructor(
    private bookingService: BookingService,
    private currencyPipe: CurrencyPipe
  ) {}

  public ngOnInit(): void {
    this.bookingService
      .searchStadium(null)
      .subscribe((result) => this.bookingService.bookingResult$.next(result));

    this.autoGroupColumnDef = {
      headerName: 'Loại sân',
      field: 'key',
      cellRendererParams: {
        innerRenderer: (params) => {
          return params.data.key;
        },
      },
    };
    this.columns = [
      {
        headerName: 'Thời gian',
        field: 'time',
      },
      {
        headerName: 'Giá',
        cellStyle: {
          'font-weight': 'bold',
        },
        valueGetter: (params) => {
          const time = params.data;
          return this.currencyPipe.transform(time?.price, 'VND');
        },
      },
    ];

    this.rows = [
      {
        key: 'Sân 4 người',
        children: [
          {
            time: '16h - 17h',
            price: 300000,
          },
        ],
      },
      {
        key: 'Sân 4 người',
        children: [
          {
            time: '16h - 17h',
            price: 300000,
          },
        ],
      },
    ];
  }
}
