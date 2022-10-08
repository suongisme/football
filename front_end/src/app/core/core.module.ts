import { PaginationComponent } from './components/pagination/pagination.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NgModule } from "@angular/core";

const imports = [];

const declarations = [
    SpinnerComponent,
    PaginationComponent
];

const exports = []

@NgModule({
    imports: imports,
    declarations: declarations,
    exports: exports
})
export class CoreModule {}