import { BreadscrumService as BreadcrumService } from '../services/breadcrum.service';
import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-breadcrum',
    templateUrl: './_breadcrum.component.html',
    styleUrls: ['./_breadcrum.component.scss']
})
export class BreadscrumComponent implements OnInit {

    constructor(
        public breadcumService: BreadcrumService
    ) {}

    public ngOnInit(): void {
        this.breadcumService.breadscrum$.subscribe(breadscrum => {
            
        })
    }
}