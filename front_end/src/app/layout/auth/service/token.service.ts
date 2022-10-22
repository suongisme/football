import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, tap, throwError } from "rxjs";
import { DataService } from "src/app/core/services/data.service";

@Injectable({
    providedIn: 'root'
})
export class TokenService implements HttpInterceptor {

    constructor(
        private dataService: DataService,
        private router: Router,
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwt = this.dataService.currentUser$?.getValue()?.jwt;
        const request = req.clone({
            setHeaders: {
                'Authorization': `${jwt && 'Bearer '+jwt}`,
            }
        })

        return next.handle(request).pipe(
            catchError((error) => {
                if (error.status === 403 || error.status === 401) {
                    this.router.navigate(['auth', 'login'])
                }
                return throwError(() => error);
            })
        );
    }
}