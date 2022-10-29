import { PendingRequest } from './../interfaces/request.interface';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Request } from '../interfaces/request.interface';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Injectable({
    providedIn: 'root'
})
export class RequestService {

    private url: string = `${environment.apiUrl}/requests`

    constructor(
        private http: HttpClient,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
    ) {}

    public requestStadium(request: Request): Observable<Request> {
        this.spinnerService.show();
        return this.http.post<Request>(this.url, request)
            .pipe(
                tap({
                    next: res => {
                        this.spinnerService.hide();
                        this.toastService.success('Đăng ký thành công');
                    }
                })
            )
    }

    public getStadiumRequest(stadiumId: string): Observable<PendingRequest[]> {
        return this.http.get<PendingRequest[]>(`${this.url}/${stadiumId}`);
    }

    public approveRequest(request: PendingRequest): Observable<any> {
        this.spinnerService.show();
        return this.http.post(`${this.url}/approve`, request);
    }
}