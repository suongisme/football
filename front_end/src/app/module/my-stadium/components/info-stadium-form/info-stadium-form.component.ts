import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { DataService } from "src/app/core/services/data.service";
import { District, Province } from 'src/app/core/interfaces/address.interface';

@Component({
    selector: 'app-info-stadium-form',
    templateUrl: './info-stadium-form.component.html',
    styleUrls: ['./info-stadium-form.component.scss']
})
export class InfoStadiumFormComponent implements OnChanges, OnInit, OnDestroy {
    
    private unsubscribe$: Subject<any> = new Subject();

    @Input() formGroup: FormGroup;

    public provinceList: Province[];
    public districtList: District[];
    public avatarFile: File;

    public get formControl() {
        return this.formGroup?.controls;
    }

    constructor(
        private fb: FormBuilder,
        private dataService: DataService
    ) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.formGroup?.currentValue)
            this.ngOnInitChangeEvent();
    }

    public ngOnInit(): void {
        this.ngOnLoadProvince();
    }

    private ngOnInitChangeEvent(): void {
        this.formGroup.get('provinceId').valueChanges.subscribe(this.ngOnLoadDistrict.bind(this));
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