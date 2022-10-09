import { CoreTableComponent } from './components/_table/_table.component';
import { RateComponent } from './components/_rate/_rate.component';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './components/_pagination/pagination.component';
import { NgModule } from "@angular/core";

const imports = [
    CommonModule,
];

const declarations = [
    PaginationComponent,
    RateComponent,
    CoreTableComponent
];

const exports = [
    PaginationComponent,
    RateComponent,
    CoreTableComponent
]

@NgModule({
    imports: imports,
    declarations: declarations,
    exports: exports
})
export class CoreModule {}