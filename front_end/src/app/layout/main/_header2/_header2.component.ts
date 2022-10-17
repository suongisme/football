import { Component } from "@angular/core";
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { MobileNavbarComponent } from '../_mobile/_navbar/_mobile-navbar.component';

@Component({
    selector: 'app-header2',
    templateUrl: './_header2.component.html',
    styleUrls: ['./_header2.component.scss']
})
export class Header2Component {

    constructor(
        private ngbOffCanvas: NgbOffcanvas
    ) {}

    public openMobileMenu(): void {
        this.ngbOffCanvas.open(MobileNavbarComponent)
    }
}