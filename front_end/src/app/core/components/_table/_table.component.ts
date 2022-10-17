import { Component, Input, OnInit } from '@angular/core';
import {
  ColDef,
  GridReadyEvent,
  GridSizeChangedEvent,
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
  @Input() rows: any[];
  @Input() hideHeader: boolean;
  @Input() treeData: boolean;
  @Input() groupHeader: ColDef;
  @Input() rowHeight: number;
  @Input() domLayout: 'normal' | 'autoHeight' | 'print' | undefined;

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

  public gridReady(gridReadyEvent: GridReadyEvent): void {
    const fakeServer = createFakeServer(this.rows);
    const datasource = createServerSideDatasource(fakeServer);
    gridReadyEvent.api.setServerSideDatasource(datasource);

    gridReadyEvent.api.sizeColumnsToFit();
  }

  public gridSizeChanged(gridSizeChangedEvent: GridSizeChangedEvent): void {}
}