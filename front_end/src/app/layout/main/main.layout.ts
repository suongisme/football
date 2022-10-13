import { BreadscrumService } from './services/breadcrum.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-main-layout',
    templateUrl: './main.layout.html',
    styleUrls: ['./main.layout.scss']
})
export class MainLayout {
    
    constructor(
        public router: Router,
    ) {}
}