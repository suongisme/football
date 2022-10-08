import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookingFormSearchComponent } from './components/form-search/form-search.component';
import { BookingContainer } from './booing.container';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [
    {
        path: '',
        component: BookingContainer,
    }
]

const declarations = [
    BookingContainer,

    BookingFormSearchComponent
]

const imports = [
    CoreModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    RouterModule.forChild(routes)
]

@NgModule({
    imports: imports,
    declarations: declarations    
})
export class BookingModule {}