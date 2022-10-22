import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Component, EventEmitter, OnDestroy, OnInit } from "@angular/core";
import { DataService } from "src/app/core/services/data.service";
import { District, Province } from 'src/app/core/interfaces/address.interface';

@Component({
    selector: 'app-info-stadium-form',
    templateUrl: './info-stadium-form.component.html',
    styleUrls: ['./info-stadium-form.component.scss']
})
export class InfoStadiumFormComponent implements OnInit, OnDestroy {
    
    private unsubscribe$: Subject<any> = new Subject();

    @Output() output: EventEmitter<FormGroup> = new EventEmitter();

    public provinceList: Province[];
    public districtList: District[];
    public formGroup: FormGroup;
    public avatarFile: File;

    constructor(
        private fb: FormBuilder,
        private dataService: DataService
    ) {}

    public ngOnInit(): void {
        this.ngOnInitForm();
        this.ngOnInitChangeEvent();
        this.ngOnLoadProvince();
        this.output.emit(this.formGroup);
    }

    private ngOnInitForm(): void {
        this.formGroup = this.fb.group({
            name: [null, [Validators.required]],
            districtId: [null, [Validators.required]],
            provinceId: [null, [Validators.required]],
            address: [null, [Validators.required]],
            avatarFile: [this.avatarFile]
        })
    }

    private ngOnInitChangeEvent(): void {
        this.formGroup.get('province').valueChanges.subscribe(this.ngOnLoadDistrict.bind(this));
    }

    private ngOnLoadProvince(): void {
        this.provinceList = [];
        this.dataService.getProvince()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(res => this.provinceList = res);
    }

    private ngOnLoadDistrict(provinceId: number): void {
        this.districtList = [];
        if (!provinceId) return;
        this.dataService.getDistrict(provinceId)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(res => this.districtList = res);
    }

    public ngOnDestroy(): void {
        this.unsubscribe$?.unsubscribe();
    }
}