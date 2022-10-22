import { RequestRentContainer } from './containers/request-rent/request-rent.container';
import { CoreModule } from 'src/app/core/core.module';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FindingRequestContainer, ActionComponent } from './containers/finding-request/finding-request.container';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { FoundRequestContainer } from './containers/found-request/found-request.container';
import { UserRequestContainer } from './containers/user-request/user-request.container';

const routes: Routes = [
    {
        path: 'rent',
        component: RequestRentContainer
    },
    {
        path: '',
        component: UserRequestContainer,
        children: [
            {
                path: 'finding-request',
                component: FindingRequestContainer,
            },
            {
                path: 'found-request',
                component: FoundRequestContainer
            },
            {
                path: '**',
                pathMatch: 'full',
                redirectTo: 'finding-request'
            }
        ],
    },
]

const imports = [
    CommonModule,
    CoreModule,
    RouterModule.forChild(routes)
];
const declarations = [
    UserRequestContainer,
    FoundRequestContainer,
    FindingRequestContainer,
    ActionComponent
];
const exports = [];

@NgModule({
    imports: imports,
    declarations: declarations,
    exports: exports,
    providers: [ CurrencyPipe ]
})
export class RequestModule {}