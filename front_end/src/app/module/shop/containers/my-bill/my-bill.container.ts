import { Component } from "@angular/core";
import { ColDef } from "ag-grid-community";
import { Paginator } from "src/app/core/interfaces/paginator.interface";

@Component({
    selector: 'app-my-bill',
    templateUrl: './my-bill.container.html',
    styleUrls: ['./my-bill.container.scss']
})
export class MyBillContainer {
    
    public columns: ColDef[];
    public paginator: Paginator = new Paginator();

    constructor() {}

    public ngOnInit(): void {
        this.ngInitColumn();
    }

    private ngInitColumn(): void {
        this.columns = [
            {
                headerName: 'Hình ảnh',
                minWidth: 120,
                maxWidth: 120,
                cellRenderer: param => {
                    return `<img class="w-100 h-100" scr="https://cdn.yousport.vn/Media/Products/150920091025151/gbd-mira-lux-20-3-tf-da-quang-1_large.jpg?width=227&height=170&quality=99&mode=crop"/>`
                }
            },
            {
                headerName: 'Tên sản phẩm',
                minWidth: 150,
                field: 'name',
                tooltipField: 'name',
            },
            {
                headerName: 'Loại sản phẩm',
                minWidth: 100,
                field: 'categoryName',
                tooltipField: 'categoryName'
            },
            {
                headerName: 'Tổng tiền'
            }
        ]
    }
}