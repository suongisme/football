import { BreadscrumService } from './services/breadcrum.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-main-layout',
    templateUrl: './main.layout.html',
    styleUrls: ['./main.layout.scss']
})
export class MainLayout {
    
    constructor(
        private s: BreadscrumService
    ) {
        this.s.breadscrum$.next([
            {
                value: 'Đặt sân'
            }
        ])
    }
}