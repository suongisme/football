import { CommonModule, CurrencyPipe } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { NgModule } from "@angular/core";
import { TimeTableComponent } from "./components/time-table/time-table.component";

const imports = [
    CoreModule,
    CommonModule,
];

const declarations = [
    TimeTableComponent
];
const exports = [
    TimeTableComponent
];

@NgModule({
    imports: imports,
    declarations: declarations,
    exports: exports,
    providers: [ CurrencyPipe ]
})
export class TimeModule {}