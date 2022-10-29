import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Tree } from 'src/app/core/interfaces/table.interface';
import { Component, OnInit } from '@angular/core';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { CurrencyPipe } from '@angular/common';
import { Battle } from '../../interfaces/battle.interface';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-battle-popup',
    templateUrl: './battle-popup.component.html',
    styleUrls: ['./battle-popup.component.scss']
})
export class BattlePopupComponent implements OnInit {

    public columnDef: ColDef[];
    public rowData: Battle[];
    public groupHeader: ColDef = {
        headerName: 'Thời gian',
        minWidth: 100,
        cellStyle: {
            'top': '10px'
        }
    }

    constructor(
        private currencyPipe: CurrencyPipe,
        public activeModal: NgbActiveModal,
    ) {}

    public ngOnInit(): void {
        this.columnDef = [
            {
                headerName: 'Giá sân',
                minWidth: 100,
                maxWidth: 100,
                valueGetter: param => {
                    return this.currencyPipe.transform(param.data.price, 'VND');
                },
                cellStyle: {
                    'top': '10px'
                }
            },
            {
                headerName: 'Tên đối thủ',
                field: 'competitor',
                cellStyle: {
                    'top': '10px'
                }
            },
            {
                headerName: 'Nhận kèo',
                cellRenderer: ActionBattleComponent,
                minWidth: 120,
                maxWidth: 120,
                cellStyle: {
                    'display': 'flex',
                    'align-items': 'center',
                    'top': '10px',
                }
            }
        ]
    }
}

@Component({
    selector: 'app-action',
    template: '<i *ngIf="!params.data.isRoot" class="fas fa-handshake cursor-pointer"></i>'
})
export class ActionBattleComponent implements ICellRendererAngularComp {
    
    public params: ICellRendererParams<Battle, any>;

    agInit(params: ICellRendererParams<Battle, any>): void {
        this.params = params;
    }
    refresh(params: ICellRendererParams<any, any>): boolean {
        return true;
    }

}