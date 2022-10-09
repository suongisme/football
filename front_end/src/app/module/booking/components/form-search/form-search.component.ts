import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
    selector: 'app-booking-form-search',
    templateUrl: './form-search.component.html',
    styleUrls: ['./form-search.component.scss']
})
export class BookingFormSearchComponent implements OnInit {

    @Output() search: EventEmitter<any> = new EventEmitter();

    public formGroup: FormGroup;

    constructor(
        private fb: FormBuilder,
    ) {}

    public ngOnInit(): void {
        this.ngOnInitForm();
        this.submit();
    }

    public submit(): void {
        this.search.emit(this.formGroup.value);
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