import { Router } from '@angular/router';
import { Paginator } from './../../../../core/interfaces/paginator.interface';
import { Stadium } from './../../interfaces/stadium.interface';
import { Component, Input, OnDestroy, OnInit, TemplateRef } from "@angular/core";
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
    @Input() actionInCard: TemplateRef<any>;
    @Input() clickableCard: boolean = true;

    public stadiumList: Stadium[];

    constructor(
        private bookingService: BookingService,
        private router: Router
    ) {}

    public ngOnInit(): void {
        this.bookingService.bookingResult$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(result => {
                this.stadiumList = result;
            })
    }

    public showDetail(stadium: Stadium): void {
        this.router.navigate(['stadium', stadium.name])
    }

    public get colClass(): string {
        return `col-lg-${12/this.lg} col-md-${12/this.md} col-sm-${12/this.sm}`
    }

    public ngOnDestroy(): void {
        this.unsubscribe$?.unsubscribe();
    }
}