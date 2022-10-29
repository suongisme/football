import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Stadium } from "../interfaces/stadium.interface";

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    public bookingResult$: BehaviorSubject<Stadium[]> = new BehaviorSubject(null);
}