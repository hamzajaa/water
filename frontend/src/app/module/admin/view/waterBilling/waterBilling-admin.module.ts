import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextareaModule} from 'primeng/inputtextarea';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {PanelModule} from 'primeng/panel';
import {InputNumberModule} from 'primeng/inputnumber';
import {BadgeModule} from 'primeng/badge';
import {MultiSelectModule} from 'primeng/multiselect';

import {ChercheurCreateAdminComponent} from './chercheur-admin/create-admin/chercheur-create-admin.component';
import {ChercheurEditAdminComponent} from './chercheur-admin/edit-admin/chercheur-edit-admin.component';
import {ChercheurViewAdminComponent} from './chercheur-admin/view-admin/chercheur-view-admin.component';
import {ChercheurListAdminComponent} from './chercheur-admin/list-admin/chercheur-list-admin.component';
import {ChercheurAdminComponent} from './chercheur-admin/chercheur-admin.component';

import {PasswordModule} from 'primeng/password';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TabViewModule} from 'primeng/tabview';
import {SplitButtonModule} from 'primeng/splitbutton';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {InputMaskModule} from "primeng/inputmask";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {RoleListComponent} from "./role-list/role-list.component";

import {FileUploadModule} from "primeng/fileupload";
import {CustomCardComponent} from "./user-app/custom-card/custom-card.component";
import {UserAppAddComponent} from "./user-app/user-app-add/user-app-add.component";
import {UserAppEditComponent} from "./user-app/user-app-edit/user-app-edit.component";
import {UserAppListComponent} from "./user-app/user-app-list/user-app-list.component";
import {UserAppViewComponent} from "./user-app/user-app-view/user-app-view.component";
import {ClientEditAdminComponent} from './client-admin/client-edit-admin/client-edit-admin.component';
import {ClientAdminComponent} from "./client-admin/client-admin.component";
import {ClientCreateAdminComponent} from "./client-admin/client-create-admin/client-create-admin.component";
import {ClientListAdminComponent} from "./client-admin/client-list-admin/client-list-admin.component";
import {ClientViewAdminComponent} from "./client-admin/client-view-admin/client-view-admin.component";
import {ExpensesCategoryAdminComponent} from './expenses-category-admin/expenses-category-admin.component';
import {
    ExpensesCategoryCreateAdminComponent
} from './expenses-category-admin/expenses-category-create-admin/expenses-category-create-admin.component';
import {
    ExpensesCategoryEditAdminComponent
} from './expenses-category-admin/expenses-category-edit-admin/expenses-category-edit-admin.component';
import {
    ExpensesCategoryListAdminComponent
} from './expenses-category-admin/expenses-category-list-admin/expenses-category-list-admin.component';
import {
    ExpensesCategoryViewAdminComponent
} from './expenses-category-admin/expenses-category-view-admin/expenses-category-view-admin.component';
import { PaymentCategoryAdminComponent } from './payment-category-admin/payment-category-admin.component';
import { PaymentCategoryCreateAdminComponent } from './payment-category-admin/payment-category-create-admin/payment-category-create-admin.component';
import { PaymentCategoryEditAdminComponent } from './payment-category-admin/payment-category-edit-admin/payment-category-edit-admin.component';
import { PaymentCategoryListAdminComponent } from './payment-category-admin/payment-category-list-admin/payment-category-list-admin.component';
import { PaymentCategoryViewAdminComponent } from './payment-category-admin/payment-category-view-admin/payment-category-view-admin.component';
import { PaymentStatusAdminComponent } from './payment-status-admin/payment-status-admin.component';
import { PaymentStatusCreateAdminComponent } from './payment-status-admin/payment-status-create-admin/payment-status-create-admin.component';
import { PaymentStatusEditAdminComponent } from './payment-status-admin/payment-status-edit-admin/payment-status-edit-admin.component';
import { PaymentStatusListAdminComponent } from './payment-status-admin/payment-status-list-admin/payment-status-list-admin.component';
import { PaymentStatusViewAdminComponent } from './payment-status-admin/payment-status-view-admin/payment-status-view-admin.component';
import { ExpensesAdminComponent } from './expenses-admin/expenses-admin.component';
import { ExpensesCreateAdminComponent } from './expenses-admin/expenses-create-admin/expenses-create-admin.component';
import { ExpensesEditAdminComponent } from './expenses-admin/expenses-edit-admin/expenses-edit-admin.component';
import { ExpensesListAdminComponent } from './expenses-admin/expenses-list-admin/expenses-list-admin.component';
import { ExpensesViewAdminComponent } from './expenses-admin/expenses-view-admin/expenses-view-admin.component';
import { PaymentAdminComponent } from './payment-admin/payment-admin.component';
import { PaymentCreateAdminComponent } from './payment-admin/payment-create-admin/payment-create-admin.component';
import { PaymentEditAdminComponent } from './payment-admin/payment-edit-admin/payment-edit-admin.component';
import { PaymentListAdminComponent } from './payment-admin/payment-list-admin/payment-list-admin.component';
import { PaymentViewAdminComponent } from './payment-admin/payment-view-admin/payment-view-admin.component';
import {RippleModule} from "primeng/ripple";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {BlockUIModule} from "primeng/blockui";
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import {ChartModule} from "primeng/chart";


@NgModule({
    declarations: [
        CustomCardComponent,
        UserAppAddComponent,
        UserAppEditComponent,
        UserAppListComponent,
        UserAppViewComponent,
        RoleListComponent,
        ChercheurCreateAdminComponent,
        ChercheurListAdminComponent,
        ChercheurViewAdminComponent,
        ChercheurEditAdminComponent,
        ChercheurAdminComponent,
        ClientAdminComponent,
        ClientCreateAdminComponent,
        ClientEditAdminComponent,
        ClientListAdminComponent,
        ClientViewAdminComponent,
        ExpensesCategoryAdminComponent,
        ExpensesCategoryCreateAdminComponent,
        ExpensesCategoryEditAdminComponent,
        ExpensesCategoryListAdminComponent,
        ExpensesCategoryViewAdminComponent,
        PaymentCategoryAdminComponent,
        PaymentCategoryCreateAdminComponent,
        PaymentCategoryEditAdminComponent,
        PaymentCategoryListAdminComponent,
        PaymentCategoryViewAdminComponent,
        PaymentStatusAdminComponent,
        PaymentStatusCreateAdminComponent,
        PaymentStatusEditAdminComponent,
        PaymentStatusListAdminComponent,
        PaymentStatusViewAdminComponent,
        ExpensesAdminComponent,
        ExpensesCreateAdminComponent,
        ExpensesEditAdminComponent,
        ExpensesListAdminComponent,
        ExpensesViewAdminComponent,
        PaymentAdminComponent,
        PaymentCreateAdminComponent,
        PaymentEditAdminComponent,
        PaymentListAdminComponent,
        PaymentViewAdminComponent,
        DashboardAdminComponent,

    ],
    imports: [
        CommonModule,
        ToastModule,
        ToolbarModule,
        TableModule,
        ConfirmDialogModule,
        DialogModule,
        PasswordModule,
        InputTextModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SplitButtonModule,
        BrowserAnimationsModule,
        DropdownModule,
        TabViewModule,
        InputSwitchModule,
        InputTextareaModule,
        CalendarModule,
        PanelModule,
        MessageModule,
        MessagesModule,
        InputNumberModule,
        BadgeModule,
        MultiSelectModule,
        InputMaskModule,
        RippleModule,
        ProgressSpinnerModule,
        BlockUIModule,
        BreadcrumbModule,
        FileUploadModule,
        ChartModule,

    ],
    exports: [

        ClientAdminComponent,
        ClientCreateAdminComponent,
        ClientEditAdminComponent,
        ClientListAdminComponent,
        ClientViewAdminComponent,

        ChercheurCreateAdminComponent,
        ChercheurListAdminComponent,
        ChercheurViewAdminComponent,
        ChercheurEditAdminComponent,
        ChercheurAdminComponent,

    ]
})
export class WaterBillingAdminModule {
}
