import { filter } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Component } from "@angular/core";
import { ICellRendererParams } from 'ag-grid-community';
import { ConfirmComponent } from 'src/app/core/components/_confirm/_confirm.component';
import { Confirm } from 'src/app/core/interfaces/confirm.interface';
import { RequestService } from 'src/app/module/request/services/request.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { PendingRequestComponent } from '../pending-request.component';

@Component({
    selector: 'app-action-pending-request',
    templateUrl: './action.component.html',
    styleUrls: ['./action.component.scss']
})
export class ActionComponent implements ICellRendererAngularComp {
    
    params: ICellRendererParams<any, any>;

    constructor(
        private ngbModal: NgbModal,
        private requestService: RequestService,
        private toastService: ToastService,
    ) {}

    agInit(params: ICellRendererParams<any, any>): void {
        this.params = params;
    }
    refresh(params: ICellRendererParams<any, any>): boolean {
        return true;
    }

    public submit(): void {
        const ref = this.ngbModal.open(ConfirmComponent, {
            centered: true,
            animation: true
        });

        const content: Confirm = {
            title: 'Xác nhận',
            message: 'Bạn có chắc chắn muốn thực hiện'
        };
        ref.componentInstance.content = content;
        ref.closed
            .pipe(filter(res => res))
            .subscribe(res => {
                this.requestService
                    .approveRequest(this.params.data)
                    .subscribe(res => {
                        this.toastService.success('Duyệt yêu cầu thành công');
                        const requestComponent = this.params.context as PendingRequestComponent;
                        requestComponent.loadData();
                    })
            })
    }

}