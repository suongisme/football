import { Role } from 'src/app/base/constant';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { Stadium } from './../../interfaces/stadium.interface';
import { Component, Input, OnInit } from "@angular/core";
import { RequestService } from 'src/app/module/request/services/request.service';
import { ColDef } from 'ag-grid-community';
import { PendingRequest } from 'src/app/module/request/interfaces/request.interface';
import { DataService } from 'src/app/core/services/data.service';
import { ActionComponent } from './action/action.component';

@Component({
    selector: 'app-pending-request',
    templateUrl: './pending-request.component.html',
    styleUrls: ['./pending-request.component.scss']
})
export class PendingRequestComponent implements OnInit {
    
    @Input() stadium: Stadium;

    public columns: ColDef[];
    public stadiumRequest$: Observable<PendingRequest[]>;

    public get isOwnerStadium(): boolean {
        const currentUser = this.dataSerivce.currentUser$.getValue();
        return currentUser 
        && currentUser.userDto.role == Role.OWNER_STADIUM
        && this.stadium.createdBy == currentUser.userDto.username;
    }

    constructor(
        private requestService: RequestService,
        private dataSerivce: DataService
    ) {}

    public ngOnInit(): void {
        this.ngOnInitColumn();
        this.loadData();
    }

    public loadData(): void {
        this.stadiumRequest$ = this.requestService.getStadiumRequest(this.stadium.id);
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
                field: 'hireDate',
                minWidth: 120,
                maxWidth: 120,
                cellStyle: {
                    'top': '10px'
                }
            },
            {
                headerName: 'Thời gian',
                valueGetter: ({data}) => {
                    return `${data.startTime}-${data.endTime}`
                },
                minWidth: 150,
                maxWidth: 150,
                cellStyle: {
                    'top': '10px'
                }
            },
            {
                headerName: 'Người thuê',
                field: 'requester',
                minWidth: 150,
                cellStyle: {
                    'top': '10px'
                }
            },
            {
                headerName: 'Tìm đối thủ',
                field: 'hasCompetitor',
                minWidth: 150,
                maxWidth: 150,
                cellStyle: {
                    'top': '10px'
                }
            }
        ];

        if (this.isOwnerStadium) {
            this.columns.push({
                headerName: 'Chấp nhận',
                cellRenderer: ActionComponent,
                minWidth: 120,
                maxWidth: 120,
                cellStyle: {
                    'top': '10px',
                    'text-align': 'center',
                }
            })
        }
    }

}