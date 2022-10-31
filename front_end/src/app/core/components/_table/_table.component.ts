import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import {
  ColDef,
  GridReadyEvent,
  GridSizeChangedEvent,
  RowClickedEvent,
} from 'ag-grid-community';
import { 
  createFakeServer, 
  createServerSideDatasource ,
  isServerSideGroupOpenByDefault,
  isServerSideGroup,
  getServerSideGroupKey,
  autoGroupColumnDef
} from './_tree-table.config';
import 'ag-grid-enterprise';
@Component({
  selector: 'app-core-table',
  templateUrl: './_table.component.html',
  styleUrls: ['./_table.component.scss'],
})
export class CoreTableComponent implements OnInit {

  @Input() columns: ColDef[];
  @Input() rows: any[] = [];
  @Input() hideHeader: boolean;
  @Input() treeData: boolean;
  @Input() groupHeader: ColDef;
  @Input() rowHeight: number;
  @Input() context;
  @Input() domLayout: 'normal' | 'autoHeight' | 'print' | undefined;

  @Output() rowClick: EventEmitter<any> = new EventEmitter();

  public autoGroupColumnDef: ColDef;
  public isServerSideGroupOpenByDefault = isServerSideGroupOpenByDefault;
  public isServerSideGroup = isServerSideGroup;
  public getServerSideGroupKey = getServerSideGroupKey;

  constructor() {}

  public ngOnInit(): void {
    this.autoGroupColumnDef = {
      ...this.groupHeader,
      ...autoGroupColumnDef
    };
  }

  public handleRowClick(rowClickedEvent: RowClickedEvent): void {
    this.rowClick.emit(rowClickedEvent.data);
  }

  public gridReady(gridReadyEvent: GridReadyEvent): void {
    const fakeServer = createFakeServer(this.rows || []);
    const datasource = createServerSideDatasource(fakeServer);
    gridReadyEvent.api.setServerSideDatasource(datasource);

    gridReadyEvent.api.sizeColumnsToFit();
  }

  public gridSizeChanged(gridSizeChangedEvent: GridSizeChangedEvent): void {
    gridSizeChangedEvent.api.sizeColumnsToFit();
  }
}