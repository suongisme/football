import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from './../interfaces/user.interface';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from "@angular/core";
import { District, Province } from '../interfaces/address.interface';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    public url = environment.apiUrl

    public activeAccount$: BehaviorSubject<string> = new BehaviorSubject(null);
    public currentUser$: BehaviorSubject<UserResponse> = new BehaviorSubject(null);
    public menuClose$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public clear$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(
        private http: HttpClient,
    ) {}

    public getProvince(): Observable<Province[]> {
        return this.http.get<Province[]>(`${this.url}/provinces`);
    }

    public getDistrict(provinceId: number): Observable<District[]> {
        return this.http.get<District[]>(`${this.url}/districts/${provinceId}`);
    }

    public logout(): void {
        this.currentUser$.next(null);
    }
}