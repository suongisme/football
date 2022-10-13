import { filter } from 'rxjs';
import { DataService } from './../../../core/services/data.service';
import { Component, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';

@Component({
    selector: 'app-header2',
    templateUrl: './_header2.component.html',
    styleUrls: ['./_header2.component.scss']
})
export class Header2Component implements OnDestroy {

    private subscription: Subscription;
    public showMobileMenu: boolean = false;

    constructor(
        private dataService: DataService,
        private router: Router,
    ) {
        this.subscription = this.dataService.menuClose$.subscribe(isOpen => {
            this.showMobileMenu = isOpen;
        })
        this.router.events
            .pipe(filter(event => event instanceof NavigationStart))
            .subscribe(res => this.showMobileMenu = false);
    }

    public openMobileMenu(): void {
        this.dataService.menuClose$.next(true);
    }

    public ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}