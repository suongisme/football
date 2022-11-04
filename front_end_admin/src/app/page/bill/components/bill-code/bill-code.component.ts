import { Component, TemplateRef } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";

@Component({
    selector: 'app-bill-code',
    templateUrl: './bill-code.component.html',
    styleUrls: ['./bill-code.component.scss']
})
export class BillCodeComponent implements ICellRendererAngularComp {

    public params: ICellRendererParams;

    constructor(
        private matDialog: MatDialog
    ) {}

    public agInit(params: ICellRendererParams): void {
        this.params = params;
    }

    public refresh(params: ICellRendererParams): boolean {
        return true;
    }

    public openDetail(template): void {
        this.matDialog.open(template)
    }
}