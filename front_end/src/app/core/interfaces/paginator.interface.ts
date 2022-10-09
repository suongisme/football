export class Paginator {
    currentPage: number;
    totalPage: number;
    pageSize: number;

    constructor() {
        this.currentPage = 1;
        this.totalPage = 0;
        this.pageSize = 20;
    }
}