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
    }

    constructor(
        private currencyPipe: CurrencyPipe
    ) {}

    public ngOnInit(): void {
        this.columnDef = [
            {
                headerName: 'Giá sân',
                minWidth: 100,
                maxWidth: 100,
                valueGetter: param => {
                    return this.currencyPipe.transform(param.data.price, 'VND');
                }
            },
            {
                headerName: 'Tên đối thủ',
                field: 'name'
            },
            {
                headerName: 'Nhận kèo',
                cellRenderer: ActionBattleComponent,
                minWidth: 100,
                maxWidth: 100,
                cellStyle: {
                    'display': 'flex',
                    'align-items': 'center'
                }
            }
        ]
        this.rowData = [
            {
                key: '01/01/2022 - Sân 3 người',
                isRoot: true,
                children: [
                    {
                        key: '15-20h',
                        name: 'Nguyễn Văn Sướng',
                        price: 2000
                    },
                    {
                        key: '20-21h',
                        name: 'Nguyễn Văn Sướng',
                        price: 2000
                    },
                    {
                        key: '21-22h',
                        name: 'Nguyễn Văn Sướng',
                        price: 2000
                    },
                    {
                        key: '15-20h12',
                        name: 'Nguyễn Văn Sướng',
                        price: 2000
                    },
                    {
                        key: '20-21h2',
                        name: 'Nguyễn Văn Sướng',
                        price: 2000
                    },
                    {
                        key: '21-22h3',
                        name: 'Nguyễn Văn Sướng',
                        price: 2000
                    },
                    {
                        key: '15-20h1111',
                        name: 'Nguyễn Văn Sướng',
                        price: 2000
                    },
                    {
                        key: '20-21hz',
                        name: 'Nguyễn Văn Sướng',
                        price: 2000
                    },
                    {
                        key: '21-22hx',
                        name: 'Nguyễn Văn Sướng',
                        price: 2000
                    },
                    {
                        key: '15-20h12a',
                        name: 'Nguyễn Văn Sướng',
                        price: 2000
                    },
                    {
                        key: '20-21h2s',
                        name: 'Nguyễn Văn Sướng',
                        price: 2000
                    },
                    {
                        key: '21-22h3d',
                        name: 'Nguyễn Văn Sướng',
                        price: 2000
                    }
                ]
                
            },
            {
                key: '02/01/2022 - Sân 3 người',
                isRoot: true,
                children: [
                    {
                        key: '15-20h',
                        name: 'Nguyễn Văn Sướng',
                        price: 2000
                    }
                ]
                
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