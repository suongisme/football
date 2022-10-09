import { CommonModule } from '@angular/common';
import { PaginationComponent } from './components/_pagination/pagination.component';
import { NgModule } from "@angular/core";

const imports = [
    CommonModule,
];

const declarations = [
    PaginationComponent
];

const exports = [
    PaginationComponent
]

@NgModule({
    imports: imports,
    declarations: declarations,
    exports: exports
})
export class CoreModule {}