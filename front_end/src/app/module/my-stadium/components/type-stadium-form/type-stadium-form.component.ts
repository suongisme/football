import { FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-type-stadium-form',
    templateUrl: './type-stadium-form.component.html',
    styleUrls: ['./type-stadium-form.component.scss']
})
export class TypeStadiumFormComponent implements OnInit {

    public formGroups: FormGroup[] = [];
    constructor(
        private fb: FormBuilder,
    ) {}

    public ngOnInit(): void {
        this.addTypeForm();
    }

    public addTypeForm(): void {
        const formGroup = this.fb.group({
            name: [null, [Validators.required]],
            types: this.fb.array([])
        })
        this.addTime(formGroup);
        this.formGroups.push(formGroup);
    }

    public removeTypeForm(index: number): void {
        if (this.formGroups.length == 1) {
            return;
        }
        this.formGroups.splice(index, 1);
    }

    public addTime(formGroup: FormGroup): void {
        this.getTypes(formGroup).push(this.fb.group({
            time: [null, [Validators.required]],
            price: [null, [Validators.required]]
        }))
    }

    public removeTime(formGroup: FormGroup, index: number): void {
        const types = this.getTypes(formGroup);
        if (types.length == 1) {
            return;
        }
        types.removeAt(index);
    }

    public getControl(formGroup: FormGroup) {
        return formGroup.controls;
    }

    public getTypes(formGroup: FormGroup) {
        return this.getControl(formGroup)['types'] as FormArray;
    }
}