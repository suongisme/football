import { Subscription } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormArray } from '@angular/forms';

@Component({
    selector: 'app-option-form',
    templateUrl: './option-form.component.html',
    styleUrls: ['./option-form.component.scss']
})
export class OptionFormComponent implements OnInit, OnDestroy {

    private subscription: Subscription;

    @Input()
    public control: FormArray<FormGroup>;

    constructor(
        private fb: FormBuilder,
        private dataService: DataService,
    ) {}

    public ngOnInit(): void {
        this.subscription = this.dataService.clear$.subscribe(res => {
            if (!res) return;
            this.control.clear();
        })
        this.addOption();
    }

    public addOption(): void {
        const formGroup = this.fb.group({
            name: [null, [Validators.required]]
        })
        this.control.push(formGroup);
    }

    public removeOption(index: number): void {
        this.control.removeAt(index);
    }

    public ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}