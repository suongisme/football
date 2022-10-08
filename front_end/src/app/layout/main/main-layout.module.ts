import { BreadscrumComponent } from './_breadcrum/_breadcrum.component';
import { NavbarComponent } from './_navbar/_navbar.component';
import { PageRoutingModule } from '../../page-routing/page-route.module';
import { MainLayout } from './main.layout';
import { NgModule } from "@angular/core";
import { Header1Component } from './_header1/_header1.component';
import { FooterComponent } from './_footer/_footer.component';
import { Header2Component } from './_header2/_header2.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { CommonModule } from '@angular/common';

const declarations = [
    MainLayout,
    Header1Component,
    Header2Component,
    NavbarComponent,
    BreadscrumComponent,
    FooterComponent,
]

const imports = [
    CommonModule,
    PageRoutingModule,
    InlineSVGModule
]

@NgModule({
    declarations: declarations,
    imports: imports,
})
export class MainLayoutModule {}