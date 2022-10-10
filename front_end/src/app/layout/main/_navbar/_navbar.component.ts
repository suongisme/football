import { Component } from "@angular/core";
import { Menu } from "src/app/base/menu.config";

@Component({
    selector: 'app-navbar',
    templateUrl: './_navbar.component.html',
    styleUrls: ['./_navbar.component.scss']
})
export class NavbarComponent {
    
    public menu = Menu;
}