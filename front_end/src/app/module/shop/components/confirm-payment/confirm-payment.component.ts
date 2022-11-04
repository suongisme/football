import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-confirm-payment',
    templateUrl: './confirm-payment.component.html',
    styleUrls: ['./confirm-payment.component.scss']
})
export class ConfirmPaymentComponent implements OnInit {

    public formGroup: FormGroup;

    constructor(
        private fb: FormBuilder,
    ) {}

    public ngOnInit(): void {
        this.ngInitForm();
    }

    private ngInitForm(): void {
        this.formGroup = this.fb.group({
            fullName: [null, [Validators.required]],
            address: [null, [Validators.required]],
            phone: [null, [Validators.required]]
        })
    }
}