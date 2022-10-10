import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { BreadscrumService } from './../../../../layout/main/services/breadcrum.service';
import { Component, OnInit } from "@angular/core";
import { BookingService } from 'src/app/module/booking/services/booking.service';
import { ConfirmComponent } from 'src/app/core/components/_confirm/_confirm.component';
import { Confirm } from 'src/app/core/interfaces/confirm.interface';

@Component({
    selector: 'app-my-stadium',
    templateUrl: './my-stadium.container.html',
    styleUrls: ['./my-stadium.container.scss']
})
export class MyStadiumContainer implements OnInit {

    private unsubscribe$: Subject<any> = new Subject();

    constructor(
        private breadscumService: BreadscrumService,
        private bookingService: BookingService,
        private modalService: NgbModal,
    ) {}

    public ngOnInit(): void {
        this.breadscumService.breadscrum$.next([{value: 'Sân của tôi'}])
        this.bookingService.searchStadium(null)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(result => this.bookingService.bookingResult$.next(result))
    }

    public deleteStadium(): void {
        const modalRef = this.modalService.open(ConfirmComponent);
        const content: Confirm = {
            title: 'Xóa sân vận động',
            message: 'Bạn có chắc chắn không!'
        };
        modalRef.componentInstance.content = content;
        modalRef.closed.subscribe(res => {
            console.log(res);
        })
    }
}