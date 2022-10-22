import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { Component, OnInit } from "@angular/core";
import { FindingRequest } from '../../interfaces/finding-request.interface';
import { CurrencyPipe } from '@angular/common';
import { AG_GRID_CELL_STYLE } from 'src/app/base/constant';
import { Paginator } from 'src/app/core/interfaces/paginator.interface';

@Component({
    selector: 'app-finding-request-container',
    templateUrl: './finding-request.container.html',
    styleUrls: ['./finding-request.container.scss']
})
export class FindingRequestContainer implements OnInit {
    
    public columnDef: ColDef[];
    public rowData: FindingRequest[] = [];
    public paginator: Paginator = new Paginator();

    constructor(
        private currencyPipe: CurrencyPipe,
    ) {}

    public ngOnInit(): void {
        this.columnDef = [
            {
                headerName: 'Hình ảnh',
                headerClass: 'header-text-center',
                cellStyle: {
                    'display': 'flex',
                    'align-items': 'center'
                },
                minWidth: 200,
                maxWidth: 200,
                cellRenderer: params => {
                    return `<img class="w-100 h-100" src="${params.data.avatar}" />`
                }
            },
            {
                headerName: 'Tên sân',
                field: 'name',
                tooltipField: 'name',
                cellStyle: {
                    ...AG_GRID_CELL_STYLE,
                    'top': '40px'
                },
            },
            {
                headerName: 'Địa chỉ',
                field: 'address',
                tooltipField: 'address',
                cellStyle: {
                    ...AG_GRID_CELL_STYLE,
                    'top': '40px'
                },
            },
            {
                headerName: 'Thời gian',
                field: 'time',
                tooltipField: 'time',
                minWidth: 150,
                maxWidth: 150,
                cellStyle: {
                    ...AG_GRID_CELL_STYLE,
                    'top': '40px'
                },
            },
            {
                headerName: 'Loại sân',
                field: 'type',
                tooltipField: 'type',
                minWidth: 100,
                maxWidth: 100,
                cellStyle: {
                    ...AG_GRID_CELL_STYLE,
                    'top': '40px'
                },
            },
            {
                headerName: 'Giá sân',
                valueGetter: params => {
                    return this.currencyPipe.transform(params.data.price, 'VND');
                },
                tooltipValueGetter: params => {
                    return this.currencyPipe.transform(params.data.price, 'VND');
                },
                minWidth: 100,
                maxWidth: 100,
                cellStyle: {
                    ...AG_GRID_CELL_STYLE,
                    'top': '40px'
                },
            },
            {
                headerName: 'Đã tìm được',
                headerClass: 'header-text-center',
                cellRenderer: ActionComponent,
                minWidth: 150,
                maxWidth: 150,
                cellStyle: {
                    ...AG_GRID_CELL_STYLE,
                    'top': '40px',
                    'display': 'flex',
                    'justify-content': 'center',
                    'font-size': '20px',
                },
            }
        ];
        this.rowData = [
            {
                avatar: 'https://lh5.googleusercontent.com/p/AF1QipMgz_2mrla0ccra_jhRTMRiAv8byKdDvSaRV30L=w493-h240-k-no',
                name: 'Sân bóng đá mini Bế Văn Đàn Đà Nẵng',
                price: 100000,
                time: '29/08/2001 19:30',
                type: '5 người',
                address: 'Bế Văn Đàn - Chính Gián - Thanh Khê - Đà Nẵng'
            },
            {
                avatar: 'https://lh5.googleusercontent.com/p/AF1QipMgz_2mrla0ccra_jhRTMRiAv8byKdDvSaRV30L=w493-h240-k-no',
                name: 'Sân bóng đá mini Bế Văn Đàn Đà Nẵng',
                price: 100000,
                time: '29/08/2001 19:30',
                type: '5 người',
                address: 'Bế Văn Đàn - Chính Gián - Thanh Khê - Đà Nẵng'
            }
        ]
    }
}

@Component({
    selector: 'app-action',
    template: '<i class="fas fa-times-circle text-danger"></i>'
})
export class ActionComponent implements ICellRendererAngularComp {
    
    agInit(params: ICellRendererParams<any, any>): void {

    }

    refresh(params: ICellRendererParams<any, any>): boolean {
        return true;
    }
}