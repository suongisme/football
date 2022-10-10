import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-time-popup',
    templateUrl: './time-popup.component.html',
    styleUrls: ['./time-popup.component.scss']
})
export class TimePopupComponent {

    constructor(
        public activeModal: NgbActiveModal
    ) {}
}