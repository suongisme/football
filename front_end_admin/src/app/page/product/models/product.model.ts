export interface ProductModel {
    id: number;
    name: string;
    code: string;
    categoryName: string;
    price: number;
    createdDate: string;
    description?: string;
    disabled?: boolean,
    status: number;
    quantity: number;
}