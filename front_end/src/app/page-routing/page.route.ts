import { MainLayout } from './../layout/main/main.layout';
import { Routes } from '@angular/router';

export const pageRoutes: Routes = [
    {
        path: '',
        component: MainLayout,
        children: [
            {
                path: '',
                loadChildren: () => import('../module/booking/booking.module').then(m => m.BookingModule)
            }
        ]
    }
]