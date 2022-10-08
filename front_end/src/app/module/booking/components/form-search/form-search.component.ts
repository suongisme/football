import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
    selector: 'app-booking-form-search',
    templateUrl: './form-search.component.html',
    styleUrls: ['./form-search.component.scss']
})
export class BookingFormSearchComponent implements OnInit {

    public formGroup: FormGroup;

    constructor(
        private fb: FormBuilder,
    ) {}

    public ngOnInit(): void {
        this.ngOnInitForm();   
    }

    private ngOnInitForm(): void {
        this.formGroup = this.fb.group({
            province: [null],
            district: [null],
            sport: [null],
            name: [null]
        })
    }
}