import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Component, OnInit } from "@angular/core";
import { ConfirmComponent } from 'src/app/core/components/_confirm/_confirm.component';
import { Confirm } from 'src/app/core/interfaces/confirm.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'app-my-stadium',
    templateUrl: './my-stadium.container.html',
    styleUrls: ['./my-stadium.container.scss']
})
export class MyStadiumContainer implements OnInit {

    private unsubscribe$: Subject<any> = new Subject();

    constructor(
        private modalService: NgbModal,
        private router: Router,
    ) {}

    public ngOnInit(): void {
       
    }

    public createStadium(): void {
        this.router.navigate(['my-stadium', 'create-stadium'])
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