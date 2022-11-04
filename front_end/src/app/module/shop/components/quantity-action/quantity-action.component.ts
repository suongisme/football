import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ICellRendererParams } from 'ag-grid-community';

@Component({
    selector: 'app-quantity-action',
    templateUrl: './quantity-action.component.html',
    styleUrls: ['./quantity-action.component.scss']
})
export class QuantityActionComponent implements ICellRendererAngularComp, OnInit {
   
    @Input() maxQuantity: number;
    @Input() minQuantity: number;
    @Input() defaultValue: number;
    @Output() change: EventEmitter<number> = new EventEmitter();

    public value: number;
    public params: ICellRendererParams<any, any>;

    public ngOnInit(): void {
        if (this.defaultValue) {
            this.value = this.defaultValue;
        }
    }

    public agInit(params: ICellRendererParams<any, any>): void {
        this.params = params;
        if (!this.value) {
            this.value = params.data.quantity;
        }
    }

    public refresh(params: ICellRendererParams<any, any>): boolean {
        return true;
    }

    public plus(): void {
        if (this.value == this.maxQuantity) return;
        this.value++;
        this.change.emit(this.value);
        const { id } = this.params.data
        var rowNode = this.params.api.getRowNode(id);
        rowNode.setDataValue('quantity', this.value);
    }

    public subtract(): void {
        if (this.value == this.minQuantity) return;
        this.value--;
        this.change.emit(this.value);
        this.params.data.quantity = this.value;
    }

}