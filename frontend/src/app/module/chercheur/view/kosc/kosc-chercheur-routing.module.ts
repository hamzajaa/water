// const root = environment.rootAppUrl;

import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from 'src/app/controller/guards/auth.guard';

@NgModule({
    imports: [
        RouterModule.forChild(
            [
                {
                    path: '',
                    children: []

                },
            ]
        ),
    ],
    exports: [RouterModule],
})
export class KoscChercheurRoutingModule {
}
