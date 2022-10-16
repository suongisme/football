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
  getServerSideGroupKey
} from './tree-table.config';
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
  @Input() autoGroupColumnDef: ColDef;

  public isServerSideGroupOpenByDefault = isServerSideGroupOpenByDefault;
  public isServerSideGroup = isServerSideGroup;
  public getServerSideGroupKey = getServerSideGroupKey;

  constructor() {}

  public ngOnInit(): void {}

  public gridReady(gridReadyEvent: GridReadyEvent): void {
    const fakeServer = createFakeServer(this.rows);
    const datasource = createServerSideDatasource(fakeServer);
    gridReadyEvent.api.setServerSideDatasource(datasource);
  }

  public gridSizeChanged(gridSizeChangedEvent: GridSizeChangedEvent): void {}
}