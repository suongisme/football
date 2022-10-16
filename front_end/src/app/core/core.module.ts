import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StadiumCardComponent } from './components/_stadium-card/stadium-card.component';
import { HttpClientModule } from '@angular/common/http';
import { EditorComponent } from './components/_editor/_editor.component';
import { CoreTableComponent } from './components/_table/_table.component';
import { RateComponent } from './components/_rate/_rate.component';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './components/_pagination/pagination.component';
import { NgModule } from "@angular/core";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileInputerComponent } from './components/_file-inputer/_file-inputer.component';
import { ListStadiumContainer } from './components/_list-stadium/list-stadium.container';
import { AgGridModule } from 'ag-grid-angular';

const imports = [
    CommonModule,
    HttpClientModule,
    CKEditorModule,
    NgbModule,
    AgGridModule
];

const declarations = [
    PaginationComponent,
    RateComponent,
    CoreTableComponent,
    EditorComponent,
    FileInputerComponent,
    ListStadiumContainer,
    StadiumCardComponent,
];

const exports = [
    PaginationComponent,
    RateComponent,
    CoreTableComponent,
    EditorComponent,
    FileInputerComponent,
    ListStadiumContainer,
    StadiumCardComponent,
]

@NgModule({
    imports: imports,
    declarations: declarations,
    exports: exports
})
export class CoreModule {}