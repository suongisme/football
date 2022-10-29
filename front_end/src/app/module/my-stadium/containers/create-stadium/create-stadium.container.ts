import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Component, OnDestroy } from "@angular/core";
import { DataService } from "src/app/core/services/data.service";
import { StadiumService } from '../../services/stadium.service';
import { prepareSubmitForm } from 'src/app/base/helper';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
    selector: 'app-create-stadium',
    templateUrl: './create-stadium.container.html',
    styleUrls: ['./create-stadium.container.scss']
})
export class CreateStadiumContainer implements OnDestroy {

    private unsubscribe$: Subject<void> = new Subject();
    
    public formGroup: FormGroup;
    public formArray: FormArray<FormGroup> = new FormArray([])
    public typeStadium: FormGroup[] = [];
    public files;

    constructor(
        private fb: FormBuilder,
        private dataService: DataService,
        private stadiumService: StadiumService,
        private toastService: ToastService,
    ) {} 

    public ngOnInit(): void {
        this.ngOnInitForm();
    }

    public clearAllOption(): void {
        this.dataService.clear$.next(true);
    }

    private ngOnInitForm(): void {
        this.formGroup = this.fb.group({
            name: [null, [Validators.required]],
            districtId: [null, [Validators.required]],
            provinceId: [null, [Validators.required]],
            address: [null, [Validators.required]],
            avatarFile: [null, [Validators.required]],
            description: [null],
            options: [this.formArray],
            images: [null],
            details: [this.typeStadium]
        })
    }

    public submit(): void {
        prepareSubmitForm(this.formGroup);
        prepareSubmitForm(this.formArray);
        this.typeStadium.forEach(prepareSubmitForm);
        if (this.formGroup.invalid || this.formArray.invalid || this.typeStadium.some(form => form.invalid)) {
            this.toastService.error('Thông tin không hợp lệ');
            return;
        }
        const { value } = this.formGroup;
        const data = {
            ...value,
            details: value.details.map(d => d.value),
            options: value.options.value,
        }
        const avatarFile = data.avatarFile?.[0];
        const images = data.images;
        delete data.images;
        delete data.avatarFile;
        const formData = new FormData();
        formData.append('stadiumDto', new Blob([JSON.stringify(data)], {
            type: 'application/json'
        }));
        formData.append('avatarFile', avatarFile);
        images?.forEach(image => formData.append('images', image))
        this.stadiumService.createStadium(formData)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(res => {
                this.formGroup.reset();
                this.formArray.reset();
                this.typeStadium.forEach(f => f.reset());
            })
    }

    public cancel(): void {
        history.back()
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}