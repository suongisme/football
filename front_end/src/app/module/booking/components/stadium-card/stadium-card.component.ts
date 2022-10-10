import { Component, Input, TemplateRef } from "@angular/core";
import { Stadium } from "../../interfaces/stadium.interface";

@Component({
    selector: 'app-stadium-card',
    templateUrl: './stadium-card.component.html',
    styleUrls: ['./stadium-card.component.scss']
})
export class StadiumCardComponent {

    @Input() stadium: Stadium;
    @Input() actionTemplate: TemplateRef<any>;

    constructor(
    ) {}
}