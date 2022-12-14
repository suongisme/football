import { BillActionComponent } from './components/action/bill-action.component';
import { DatePipe } from '@angular/common';
import { BillService } from './services/bill.service';
import { Component, OnInit } from "@angular/core";
import { ColDef, GridReadyEvent, GridSizeChangedEvent } from "ag-grid-community";
import { StatusComponent } from "src/app/base/core/components/cells/status/status.component";
import { PaginationModel } from "src/app/base/core/models/pagination.model";
import { BASE_STYLE, DEFAULT_PAGE_SIZE } from "src/app/base/_helpers/constant";
import { CurrencyPipe } from '@angular/common';
import { BillModel } from './models/bill.model';

@Component({
    selector: 'app-bill-container',
    templateUrl: './bill.container.html',
    styleUrls: ['./bill.container.scss']
})
export class BillContainer implements OnInit {

    public pagination: PaginationModel;
    public rowData: BillModel[] = [];
    public columnDef: ColDef[] | any[];
    public currentFormSearch: BillModel;

    constructor(
        private billService: BillService,
        private currencyPipe: CurrencyPipe,
        private datePipe: DatePipe
    ) {}

    public ngOnInit(): void {
        this.pagination = new PaginationModel();
        this.initColumn();
    }

    public doSearch(bill: BillModel, page: number): void {
        if (bill) this.currentFormSearch = bill;
        this.pagination.currentPage = page;
        this.billService.search({
            data: this.currentFormSearch,
            page: this.pagination.currentPage,
            pageSize: DEFAULT_PAGE_SIZE
        }).subscribe(res => {
            this.rowData = res.data;
            this.pagination.totalPage = Math.ceil(res.total / this.pagination.pageSize);
            this.pagination.totalRecord = res.total;
            this.pagination.dataLength = this.rowData.length;
        })
    }

    public initColumn(): void {
        this.columnDef = [
            {
                headerName: 'STT',
                headerTooltip: 'STT',

                minWidth: 80,
                maxWidth: 80,
                cellStyle: BASE_STYLE,
                valueGetter: params => {
                    return params.node.rowIndex + 1 + (DEFAULT_PAGE_SIZE * (this.pagination.currentPage - 1));
                }
            },

            {
                headerName: 'M?? ????n h??ng',
                headerTooltip: 'M?? ????n h??ng',
                field: 'id',
                tooltipField: 'id',
                cellStyle: BASE_STYLE
            },

            {
                headerName: 'Ng?????i mua',
                headerTooltip: 'Ng?????i mua',

                cellRenderer: ({data}) => {
                  return `<div>
                    <div style="line-height: 20px;" class="d-flex">
                      <span>H??? t??n:&nbsp;</span>
                      <div class="text-truncate fst-italic text-decoration-underline" title="${data.fullName}">${data.fullName}</div>
                    </div>
                    <div style="line-height: 20px;" class="d-flex">
                      <span>T??n ????ng nh???p:&nbsp;</span>
                      <div class="text-truncate fst-italic text-decoration-underline" title="${data.createdBy}">${data.createdBy}</div>
                    </div>
                    <div style="line-height: 20px;" class="d-flex">
                      <span>S??? ??i???n tho???i:&nbsp;</span>
                      <div class="text-truncate fst-italic text-decoration-underline" title="${data.phone}">${data.phone}</div>
                    </div>
                  </div>`;
                },
                cellStyle: BASE_STYLE
            },

            {
                headerName: 'Ng??y mua',
                headerTooltip: 'Ng??y mua',

                valueGetter: param => this.datePipe.transform(param.data.createdDate, 'dd/MM/yyyy'),
                tooltipValueGetter: param => this.datePipe.transform(param.data.createdDate, 'dd/MM/yyyy'),
                cellStyle: BASE_STYLE,
            },

            {
                headerName: 'T???ng ti???n',
                headerTooltip: 'T???ng ti???n',

                valueGetter: param => {
                    return this.currencyPipe.transform(param.data.total, 'VND');
                },
                tooltipValueGetter: param => {
                    return this.currencyPipe.transform(param.data.total, 'VND');
                },

                cellStyle: BASE_STYLE,
            },

            {
                headerName: 'Tr???ng th??i',
                headerTooltip: 'Tr???ng th??i',

                cellStyle: BASE_STYLE,
                cellRenderer: StatusComponent,
                values: ['Ch??? ph?? duy???t', '???? ph?? duy???t', 'T??? ch???i', '??ang giao h??ng', '???? giao h??ng'],
                colors: ['#3366FF', '#52BD94', '#D14343', '#52BD94', '#52BD94'],
                backgrounds: ['transparent', 'transparent', 'transparent', 'transparent', 'transparent'],
            },

            {
                headerName: 'Ng??y ph?? duy???t',
                headerTooltip: 'Ng??y ph?? duy???t',

                valueGetter: param => this.datePipe.transform(param.data.approveDate, 'dd/MM/yyyy'),
                tooltipValueGetter: param => this.datePipe.transform(param.data.approveDate, 'dd/MM/yyyy'),
                cellStyle: BASE_STYLE,
            },

            {
                cellRenderer: BillActionComponent,
                cellStyle: {
                    'overflow': 'unset'
                },
                minWidth: 50,
                maxWidth: 50,
            }
        ]
    }

    public gridSizeChanged(event: GridSizeChangedEvent): void {
        event.api.sizeColumnsToFit();
    }

    public onGridReady(event: GridReadyEvent): void {

    }
}
