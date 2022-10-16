import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { BookingModule } from './../booking/booking.module';
import { MyStadiumContainer } from './containers/my-stadium/my-stadium.container';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { CreateStadiumContainer } from './containers/create-stadium/create-stadium.container';
import { InfoStadiumFormComponent } from './components/info-stadium-form/info-stadium-form.component';
import { CoreModule } from 'src/app/core/core.module';

const routes: Routes = [
    {
        path: '',
        component: MyStadiumContainer
    },
    {
        path: 'create-stadium',
        component: CreateStadiumContainer
    }
]

const imports = [
    CoreModule,
    BookingModule,
    CommonModule,
    NgSelectModule,
    RouterModule.forChild(routes)
];
const declarations = [
    MyStadiumContainer,
    CreateStadiumContainer,

    InfoStadiumFormComponent,
];

@NgModule({
    imports: imports,
    declarations: declarations
})
export class MyStadiumModule {}