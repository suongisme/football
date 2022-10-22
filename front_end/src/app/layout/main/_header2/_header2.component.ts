import { Component, OnInit } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
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
        this.dataService.logout();
    }

    public openMobileMenu(): void {
        this.ngbOffCanvas.open(MobileNavbarComponent);
    }
}
