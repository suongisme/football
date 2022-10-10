import { Component } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TimePopupComponent } from "../time-popup/time-popup.component";

@Component({
    selector: 'app-find-empty-form',
    templateUrl: './find-empty-form.component.html',
    styleUrls: ['./find-empty-form.component.scss']
})
export class FindEmptyFormComponent {
  
    constructor(
        private modalService: NgbModal
    ) {}
    
    public submit(): void {
        const modalRef = this.modalService.open(TimePopupComponent);
    }
}