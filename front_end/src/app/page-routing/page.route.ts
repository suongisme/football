import { MainLayout } from './../layout/main/main.layout';
import { Routes } from '@angular/router';

export const pageRoutes: Routes = [
    {
        path: '',
        component: MainLayout,
        children: [
            {
                path: 'stadium',
                loadChildren: () => import('../module/booking/booking.module').then(m => m.BookingModule)
            },
            {
                path: 'my-stadium',
                loadChildren: () => import('../module/my-stadium/my-stadium.module').then(m => m.MyStadiumModule)
            },
            {
                path: '**',
                pathMatch: 'full',
                redirectTo: 'stadium'
            }
        ]
    },
]