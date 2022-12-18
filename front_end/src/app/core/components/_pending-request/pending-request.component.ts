import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from "@angular/core";
import { ColDef } from 'ag-grid-community';
import { PendingRequest } from 'src/app/module/request/interfaces/request.interface';
import { TimePipe } from '../../pipes/time.pipe';
import { ActionComponent } from './action/action.component';

@Component({
    selector: 'app-pending-request',
    templateUrl: './pending-request.component.html',
    styleUrls: ['./pending-request.component.scss']
})
export class PendingRequestComponent implements OnInit {
    
    @Input() showAction: boolean;
    @Input() stadiumRequest: PendingRequest[] = [];
    
    public columns: ColDef[];

    constructor(
        private timePipe: TimePipe
    ) {}

    public ngOnInit(): void {
        this.ngOnInitColumn();
    }

    private ngOnInitColumn(): void {
        this.columns = [
            {
                headerName: 'Tên sân',
                field: 'stadiumName',
                tooltipField: 'stadiumName',
                minWidth: 150,
                cellStyle: {
                    'top': '10px'
                }
            },
            {
                headerName: 'Loại sân',
                field: 'typeName',
                minWidth: 150,
                cellStyle: {
                    'top': '10px'
                }
            },
            {
                headerName: 'Ngày thuê',
                valueGetter: ({data}) => {
                    return formatDate(data.hireDate, 'dd-MM-yyyy', 'en-US');
                },
                minWidth: 120,
                maxWidth: 120,
                cellStyle: {
                    'top': '10px'
                }
            },
            {
                headerName: 'Thời gian',
                valueGetter: ({data}) => {
                    return `${this.timePipe.transform(data.startTime)}-${this.timePipe.transform(data.endTime)}`
                },
                minWidth: 150,
                maxWidth: 150,
                cellStyle: {
                    'top': '10px'
                }
            },
            {
                headerName: 'Người thuê',
                cellRenderer: ({data}) => {
                    return `<div class='d-flex flex-column'>
                    <span style='line-height: 20px;'>${data.fullName}</span>
                    <span style='line-height: 20px;'>${data.phone}</span>
                    </div>`
                },
                tooltipValueGetter: ({data}) => {
                    return `${data.fullName} - ${data.phone}`
                },
                cellStyle: {
                    'top': '10px',
                },
                minWidth: 150,
            },
            {
                headerName: 'Tìm đối thủ',
                field: 'hasCompetitor',
                minWidth: 130,
                maxWidth: 130,
                cellStyle: {
                    'top': '10px',
                    'text-align': 'center',
                }
            }
        ];
        if (this.showAction) {
            this.columns.push({
                headerName: 'Chấp nhận',
                cellRenderer: ActionComponent,
                minWidth: 120,
                maxWidth: 120,
                cellStyle: {
                    'display': 'flex',
                    'justify-content': 'center',
                    'align-items': 'center'
                }
            })
        }
    }
}