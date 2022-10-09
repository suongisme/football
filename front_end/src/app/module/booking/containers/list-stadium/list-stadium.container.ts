import { Paginator } from './../../../../core/interfaces/paginator.interface';
import { Stadium } from './../../interfaces/stadium.interface';
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { BookingService } from "../../services/booking.service";
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-list-stadium-container',
    templateUrl: './list-stadium.container.html',
    styleUrls: ['./list-stadium.container.scss']
})
export class ListStadiumContainer implements OnInit, OnDestroy {

    private unsubscribe$: Subject<any> = new Subject();

    @Input() lg: number = 4;
    @Input() md: number = 3;
    @Input() sm: number = 2;

    public stadiumList: Stadium[];

    constructor(
        private bookingService: BookingService
    ) {}

    public ngOnInit(): void {
        this.bookingService.bookingResult$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(result => {
                this.stadiumList = result;
            })
    }

    public get colClass(): string {
        return `col-lg-${12/this.lg} col-md-${12/this.md} col-sm-${12/this.sm}`
    }

    public ngOnDestroy(): void {
        this.unsubscribe$?.unsubscribe();
    }
}