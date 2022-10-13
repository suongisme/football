import { BookingFormSearchComponent } from './../../../module/booking/components/search-form/form-search.component';
import { Component } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-header2',
    templateUrl: './_header2.component.html',
    styleUrls: ['./_header2.component.scss']
})
export class Header2Component {

    constructor(
        private modal: NgbModal
    ) {}

    public openSearchForm(): void {
        const modalRef = this.modal.open(BookingFormSearchComponent);
    }
}