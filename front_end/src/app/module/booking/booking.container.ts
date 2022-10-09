import { takeUntil, Subject } from 'rxjs';
import { BookingService } from './services/booking.service';
import { Paginator } from '../../core/interfaces/paginator.interface';
import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
    selector: 'app-booking-container',
    templateUrl: './booking.container.html',
    styleUrls: ['./booking.container.scss']
})
export class BookingContainer implements OnInit, OnDestroy {

    private unsubscribe$: Subject<any> = new Subject();

    public paginator: Paginator = new Paginator();
    public currentFormSearch: any;

    constructor(
        private bookingService: BookingService,
    ) {}
    
    public ngOnInit(): void {
        
    }

    public ngOnSearch(formSearch): void {
        if (formSearch) this.currentFormSearch = formSearch;
        this.bookingService.searchStadium(this.currentFormSearch)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(result => this.bookingService.bookingResult$.next(result))
    }

    public ngOnDestroy(): void {
        this.unsubscribe$?.unsubscribe();
    }
}