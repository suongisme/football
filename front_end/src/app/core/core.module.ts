import { HttpClientModule } from '@angular/common/http';
import { EditorComponent } from './components/_editor/_editor.component';
import { CoreTableComponent } from './components/_table/_table.component';
import { RateComponent } from './components/_rate/_rate.component';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './components/_pagination/pagination.component';
import { NgModule } from "@angular/core";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileInputerComponent } from './components/_file-inputer/_file-inputer.component';

const imports = [
    CommonModule,
    HttpClientModule,
    CKEditorModule
];

const declarations = [
    PaginationComponent,
    RateComponent,
    CoreTableComponent,
    EditorComponent,
    FileInputerComponent,
];

const exports = [
    PaginationComponent,
    RateComponent,
    CoreTableComponent,
    EditorComponent,
    FileInputerComponent,
]

@NgModule({
    imports: imports,
    declarations: declarations,
    exports: exports
})
export class CoreModule {}