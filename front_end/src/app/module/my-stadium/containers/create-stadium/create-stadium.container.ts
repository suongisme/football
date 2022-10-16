import { ToastService } from './../../../../core/services/toast.service';
import { Component } from "@angular/core";
import { DataService } from "src/app/core/services/data.service";

@Component({
    selector: 'app-create-stadium',
    templateUrl: './create-stadium.container.html',
    styleUrls: ['./create-stadium.container.scss']
})
export class CreateStadiumContainer {
    
    constructor(
        private dataService: DataService,
        private toastService: ToastService
     ) {}

    public clearAllOption(): void {
        this.dataService.clear$.next(true);
    }

    public cancel(): void {
        history.back()
    }
}