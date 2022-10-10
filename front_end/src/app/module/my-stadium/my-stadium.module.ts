import { CommonModule } from '@angular/common';
import { BookingModule } from './../booking/booking.module';
import { MyStadiumContainer } from './containers/my-stadium/my-stadium.container';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: '',
        component: MyStadiumContainer
    }
]

const imports = [
    BookingModule,
    CommonModule,
    RouterModule.forChild(routes)
];
const declarations = [
    MyStadiumContainer
];

@NgModule({
    imports: imports,
    declarations: declarations
})
export class MyStadiumModule {}