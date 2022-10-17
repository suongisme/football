import { CoreModule } from 'src/app/core/core.module';
import { RequestContainer } from './request.container';
import { CommonModule } from '@angular/common';
import { FindingRequestContainer, ActionComponent } from './containers/finding-request/finding-request.container';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { FoundRequestContainer } from './containers/found-request/found-request.container';

const routes: Routes = [
    {
        path: '',
        component: RequestContainer,
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
        ]
    }
]

const imports = [
    CommonModule,
    CoreModule,
    RouterModule.forChild(routes)
];
const declarations = [
    RequestContainer,
    FoundRequestContainer,
    FindingRequestContainer,
    ActionComponent
];
const exports = [];

@NgModule({
    imports: imports,
    declarations: declarations,
    exports: exports
})
export class RequestModule {}