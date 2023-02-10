// const root = environment.rootAppUrl;

import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from 'src/app/controller/guards/auth.guard';

import {ChercheurAdminComponent} from './chercheur-admin/chercheur-admin.component';
import {RoleListComponent} from "./role-list/role-list.component";
import {UserAppListComponent} from "./user-app/user-app-list/user-app-list.component";
import {ClientAdminComponent} from "./client-admin/client-admin.component";
import {PaymentStatusAdminComponent} from "./payment-status-admin/payment-status-admin.component";
import {PaymentCategoryAdminComponent} from "./payment-category-admin/payment-category-admin.component";
import {PaymentAdminComponent} from "./payment-admin/payment-admin.component";
import {ExpensesCategoryAdminComponent} from "./expenses-category-admin/expenses-category-admin.component";
import {ExpensesAdminComponent} from "./expenses-admin/expenses-admin.component";
import {DashboardAdminComponent} from "./dashboard-admin/dashboard-admin.component";


@NgModule({
    imports: [
        RouterModule.forChild(
            [
                {
                    path: '',
                    children: [


                        {

                            path: 'dashboard',
                            children: [
                                {
                                    path: '',
                                    component: DashboardAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'client',
                            children: [
                                {
                                    path: 'list',
                                    component: ClientAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'expenses',
                            children: [
                                {
                                    path: 'list',
                                    component: ExpensesAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'expenses-category',
                            children: [
                                {
                                    path: 'list',
                                    component: ExpensesCategoryAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'payment',
                            children: [
                                {
                                    path: 'list',
                                    component: PaymentAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'payment-category',
                            children: [
                                {
                                    path: 'list',
                                    component: PaymentCategoryAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'payment-status',
                            children: [
                                {
                                    path: 'list',
                                    component: PaymentStatusAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'chercheur',
                            children: [
                                {
                                    path: 'list',
                                    component: ChercheurAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'gestion-utilisateur',
                            children: [
                                {
                                    path: 'gestion_users',
                                    component: UserAppListComponent,
                                    canActivate: [AuthGuard]
                                },
                                {
                                    path: 'gestion_roles',
                                    component: RoleListComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        }


                    ]
                },
            ]
        ),
    ],
    exports: [RouterModule],
})
export class WaterBillingAdminRoutingModule {
}
