import { BehaviorSubject } from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DataService {

    public menuClose$: BehaviorSubject<boolean> = new BehaviorSubject(false);
}