import { Component, OnInit } from '@angular/core';
import { NgbOffcanvas, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs';
import { ConfirmComponent } from 'src/app/core/components/_confirm/_confirm.component';
import { DataService } from 'src/app/core/services/data.service';
import { MobileNavbarComponent } from '../_mobile/_navbar/_mobile-navbar.component';

@Component({
    selector: 'app-header2',
    templateUrl: './_header2.component.html',
    styleUrls: ['./_header2.component.scss'],
})
export class Header2Component implements OnInit {
    public isLoggedIn: boolean = false;
    public username: string;

    constructor(
        private ngbOffCanvas: NgbOffcanvas,
        private dataService: DataService,
        private ngbModal: NgbModal,
    ) { }

    public ngOnInit(): void {
        this.dataService.currentUser$.subscribe(res => {
            this.isLoggedIn = res != null;
            if (this.isLoggedIn) {
                this.username = res.userDto.username;
            } else {
                this.username = null;
            }
        })
    }

    public logout(): void {
        const ref = this.ngbModal.open(ConfirmComponent, {
            centered: true,
            animation: true
        })
        ref.componentInstance.content = {
            title: 'Xác nhận',
            message: 'Bạn có chắc chắn muốn đăng xuất?'
        };
        ref.closed
            .pipe(filter(res => res))
            .subscribe(res => this.dataService.logout())
    }

    public openMobileMenu(): void {
        this.ngbOffCanvas.open(MobileNavbarComponent);
    }
}
