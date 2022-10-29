import { FindingRequest } from './../interfaces/finding-request.interface';
import { ResponsePagination } from './../../../core/interfaces/paginator.interface';
import { PendingRequest } from './../interfaces/request.interface';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Request } from '../interfaces/request.interface';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { Battle } from '../../booking/interfaces/battle.interface';

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
        return this.http.post(`${this.url}/approve`, request)
            .pipe(
                tap(res => {
                    this.spinnerService.hide();
                })
            );
    }

    public rejectRequest(request: PendingRequest): Observable<any> {
        this.spinnerService.show();
        return this.http.post(`${this.url}/reject`, request)
            .pipe(
                tap(res => {
                    this.spinnerService.hide();
                })
            );
    }

    public getCompetitorStadium(stadiumId: string): Observable<Battle[]> {
        this.spinnerService.show();
        return this.http.get<Battle[]>(`${this.url}/competitor/${stadiumId}`)
            .pipe(tap(res => {
                this.spinnerService.hide();
            }))
    }

    public getFindingRequest(formSearch): Observable<ResponsePagination<FindingRequest[]>> {
        this.spinnerService.show();
        return this.http.post<ResponsePagination<FindingRequest[]>>(`${this.url}/finding-request`, formSearch)
            .pipe(
                tap(res => this.spinnerService.hide())
            )
    }

    public getFoundRequest(formSearch): Observable<ResponsePagination<Request[]>> {
        this.spinnerService.show();
        return this.http.post<ResponsePagination<Request[]>>(`${this.url}/found-request`, formSearch)
            .pipe(
                tap(res => this.spinnerService.hide())
            )
    }
}