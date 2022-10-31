import { ChallengeRequestComponent } from './containers/challenge-request/challenge-request.component';
import { RequestRentContainer } from './containers/request-rent/request-rent.container';
import { CoreModule } from 'src/app/core/core.module';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FindingRequestContainer } from './containers/finding-request/finding-request.container';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { UserRequestContainer } from './containers/user-request/user-request.container';
import { ChallengeActionComponent } from './containers/challenge-request/action/action.component';

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
    FindingRequestContainer,
    ChallengeRequestComponent,
    ChallengeActionComponent,
];
const exports = [];

@NgModule({
    imports: imports,
    declarations: declarations,
    exports: exports,
    providers: [ CurrencyPipe ]
})
export class RequestModule {}