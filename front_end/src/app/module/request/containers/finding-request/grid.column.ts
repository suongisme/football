import { ColDef } from 'ag-grid-community';
import { ActionComponent } from './finding-request.container';

export const COLUMN_DEF: ColDef[] = [
    {
        headerName: 'Hình ảnh',
        cellRenderer: params => {
            return `<h1>hello world</h1>`
        }
    },
    {
        headerName: 'Tên sân',
        field: 'name'
    },
    {
        headerName: 'Thời gian',
        field: 'time'
    },
    {
        headerName: 'Loại sân',
        field: 'type'
    },
    {
        headerName: 'Giá sân',
        field: 'price'
    },
    {
        headerName: 'Đã tìm được',
        cellRenderer: ActionComponent
    }
]