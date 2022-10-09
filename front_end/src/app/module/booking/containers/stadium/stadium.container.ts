import { takeUntil, Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { BookingService } from '../../services/booking.service';
import { Paginator } from 'src/app/core/interfaces/paginator.interface';

@Component({
    selector: 'app-stadium-container',
    templateUrl: './stadium.container.html',
    styleUrls: ['./stadium.container.scss']
})
export class StadiumContainer implements OnInit, OnDestroy {

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