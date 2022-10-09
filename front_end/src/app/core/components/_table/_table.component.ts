import { CoreColumn } from './../../interfaces/column.interface';
import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-core-table',
    templateUrl: './_table.component.html',
    styleUrls: ['./_table.component.scss']
})
export class CoreTableComponent {

    @Input() columns: CoreColumn[];
    @Input() rows: any[];
    @Input() headerHeight: number;
    @Input() rowHeight: number;
    @Input() hideHeader: boolean;
}