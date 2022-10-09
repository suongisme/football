import { Paginator } from './../../interfaces/paginator.interface';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {

    @Input() paginator: Paginator;
    @Output() paginate: EventEmitter<number> = new EventEmitter();

    public rangeDots: (number | string)[];

    public ngOnChanges(changes: SimpleChanges): void {
        this.rangeDots = [1,2,3,4,5,6,7,8]
    }

    public ngOnGoToFirst(): void {
        if (this.isFirstPage) return;
        this.ngOnPaginate(1);
    }

    public ngOnGoToLast(): void {
        if (this.isLastPage) return;
        this.ngOnPaginate(this.paginator.totalPage);
    }

    public ngOnPreviousPage(): void {
        if (this.isLastPage) return;
        this.ngOnPaginate(this.paginator.currentPage - 1);
    }

    public ngOnNextPage(): void {
        if (this.isFirstPage) return;
        this.ngOnPaginate(this.paginator.currentPage + 1);
    }

    public ngOnPaginate(page): void {
        this.paginator.currentPage = page;
        this.paginate.emit(this.paginator.currentPage);
    }

    public get isLastPage(): boolean {
        return this.paginator.currentPage == this.paginator.totalPage;
    }

    public get isFirstPage(): boolean {
        return this.paginator.currentPage == 1;
    }
}