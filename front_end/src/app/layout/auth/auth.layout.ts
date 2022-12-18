import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationStart, Router } from '@angular/router';
import { filter, Subscription } from "rxjs";

@Component({
    selector: 'app-auth-layout',
    templateUrl: './auth.layout.html',
    styleUrls: ['./auth.layout.scss'],
})
export class AuthLayout implements OnInit, OnDestroy {
    
    public isLoginPage: boolean;
    private subscrition: Subscription;

    constructor(
        private router: Router
    ) { }

    public ngOnInit(): void {
        this.isLoginPage = this.router.url.includes('login');
        this.subscrition = this.router.events
            .pipe(filter(res => res instanceof NavigationStart))
            .subscribe((res: NavigationStart) => {
                this.isLoginPage = res.url.includes('login');
            })
    }

    public ngOnDestroy(): void {
        this.subscrition.unsubscribe();
    }
}