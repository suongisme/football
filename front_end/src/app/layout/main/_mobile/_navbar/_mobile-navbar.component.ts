import { Component } from "@angular/core";
import { DataService } from "src/app/core/services/data.service";

@Component({
    selector: 'app-mobile-navbar',
    templateUrl: './_mobile-navbar.component.html',
    styleUrls: ['./_mobile-navbar.component.scss']
})
export class MobileNavbarComponent {

    constructor(
        private dataService: DataService,
    ) {}

    public closeMobileMenu(): void {
        this.dataService.menuClose$.next(false);
    }
}