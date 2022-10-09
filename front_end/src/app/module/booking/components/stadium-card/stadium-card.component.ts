import { Component, Input } from "@angular/core";
import { Stadium } from "../../interfaces/stadium.interface";

@Component({
    selector: 'app-stadium-card',
    templateUrl: './stadium-card.component.html',
    styleUrls: ['./stadium-card.component.scss']
})
export class StadiumCardComponent {

    @Input() stadium: Stadium;
    
}