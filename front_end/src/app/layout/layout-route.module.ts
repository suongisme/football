import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: 'auth',
        loadComponent: () => import('./auth/auth.layout').then(c => c.AuthLayout)
    },
    {
        path: '',
        loadChildren: () => import('./main/main-layout.module').then(m => m.MainLayoutModule) 
    }
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class LayoutRouteModule {}