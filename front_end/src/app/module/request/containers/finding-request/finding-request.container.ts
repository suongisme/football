import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { Component, OnInit } from "@angular/core";
import { COLUMN_DEF } from './grid.column';

@Component({
    selector: 'app-finding-request-container',
    templateUrl: './finding-request.container.html',
    styleUrls: ['./finding-request.container.scss']
})
export class FindingRequestContainer implements OnInit {
    
    public columnDef: ColDef[];
    public rowData: any[] = [];

    constructor() {}

    public ngOnInit(): void {
        this.columnDef = [
            {
                headerName: 'Hình ảnh',
                cellRenderer: params => {
                    return `<h1>hello world</h1>`
                }
            },
            {
                headerName: 'Tên sân',
                field: 'name'
            },
            {
                headerName: 'Thời gian',
                field: 'time'
            },
            {
                headerName: 'Loại sân',
                field: 'type'
            },
            {
                headerName: 'Giá sân',
                field: 'price'
            },
            {
                headerName: 'Đã tìm được',
                cellRenderer: ActionComponent
            }
        ];
        this.rowData = [
            {

            }
        ]
    }
}

@Component({
    selector: 'app-action',
    template: '<i class="fas fa-times-circle"></i>'
})
export class ActionComponent implements ICellRendererAngularComp {
    
    agInit(params: ICellRendererParams<any, any>): void {

    }

    refresh(params: ICellRendererParams<any, any>): boolean {
        return true;
    }
}