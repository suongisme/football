import { Paginator } from './../../../../core/interfaces/paginator.interface';
import { Stadium } from './../../interfaces/stadium.interface';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { BookingService } from "../../services/booking.service";
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-list-stadium-container',
    templateUrl: './list-stadium.container.html',
    styleUrls: ['./list-stadium.container.scss']
})
export class ListStadiumContainer implements OnInit, OnDestroy {

    private unsubscribe$: Subject<any> = new Subject();

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

    public ngOnDestroy(): void {
        this.unsubscribe$?.unsubscribe();
    }
}