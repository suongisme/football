import { Breadcrum } from '../interfaces/breadcrum.interface';
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BreadscrumService {
    public breadscrum$: BehaviorSubject<Breadcrum[]> = new BehaviorSubject([]);
}