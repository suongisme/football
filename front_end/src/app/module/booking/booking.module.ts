import { FindEmptyFormComponent } from './components/find-empty-form/find-empty-form.component';
import { TimeModule } from './../time/time.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { StadiumDetailContainer } from './containers/stadium-detail/stadium-detail.container';
import { ListStadiumContainer } from './containers/list-stadium/list-stadium.container';
import { StadiumCardComponent } from './components/stadium-card/stadium-card.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { BookingFormSearchComponent } from './components/search-form/form-search.component';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { StadiumContainer } from './containers/stadium/stadium.container';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SlideShowComponent } from './components/slide-show/slide-show.component';

const routes: Routes = [
    {
        path: '',
        component: StadiumContainer,
    },
    {
        path: ':flag',
        component: StadiumDetailContainer
    }
]

const declarations = [
    StadiumContainer,
    ListStadiumContainer,
    StadiumDetailContainer,

    BookingFormSearchComponent,
    StadiumCardComponent,
    ContactFormComponent,
    FindEmptyFormComponent,
    SlideShowComponent,
]

const imports = [
    CoreModule,
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgSelectModule,
    TimeModule,
    RouterModule.forChild(routes)
]

@NgModule({
    imports: imports,
    declarations: declarations,
    providers: [ CurrencyPipe ]
})
export class BookingModule {}