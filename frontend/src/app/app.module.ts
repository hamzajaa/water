import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule, DatePipe} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './controller/interceptors/jwt.interceptor';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {MessageModule} from 'primeng/message';
import {PanelModule} from 'primeng/panel';
import {PanelMenuModule} from 'primeng/panelmenu';
import {PasswordModule} from 'primeng/password';
import {RadioButtonModule} from 'primeng/radiobutton';
import {SplitButtonModule} from 'primeng/splitbutton';
import {TabViewModule} from 'primeng/tabview';
import {InputTextareaModule} from 'primeng/inputtextarea';

import {AppComponent} from './app.component';
import {AppMainComponent} from './app.main.component';
import {AppConfigComponent} from './app.config.component';
import {AppCalendarComponent} from './pages/app.calendar.component';
import {AppTimelineDemoComponent} from './pages/app.timelinedemo.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppMenuComponent} from './app.menu.component';
import {AppMenuitemComponent} from './app.menuitem.component';
import {AppRightMenuComponent} from './app.right-menu.component';
import {AppTopBarComponent} from './app.topbar.component';
import {AppFooterComponent} from './app.footer.component';
import {FloatLabelDemoComponent} from './demo/view/floatlabeldemo.component';
import {InvalidStateDemoComponent} from './demo/view/invalidstatedemo.component';
import {InputDemoComponent} from './demo/view/inputdemo.component';
import {ButtonDemoComponent} from './demo/view/buttondemo.component';
import {EmptyDemoComponent} from './demo/view/emptydemo.component';
import {ChartsDemoComponent} from './demo/view/chartsdemo.component';
import {FileDemoComponent} from './demo/view/filedemo.component';
import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';
import {DocumentationComponent} from './demo/view/documentation.component';
import {CountryService} from './demo/service/countryservice';
import {EventService} from './demo/service/eventservice';
import {NodeService} from './demo/service/nodeservice';
import {MenuService} from './app.menu.service';
import {CustomerService} from './demo/service/customerservice';
import {PhotoService} from './demo/service/photoservice';
import {ProductService} from './demo/service/productservice';
import {IconService} from './demo/service/iconservice';

import {AccessDeniedComponent} from './auth/access-denied/access-denied.component';

import {UserService} from './controller/service/user.service';
import {RoleService} from './controller/service/role.service';
import {HomeComponent} from './demo/view/home/home.component';
import {InputSwitchModule} from 'primeng/inputswitch';

import {AdminModule} from './module/admin/admin.module';
import {AdminRoutingModule} from './module/admin/admin-routing.module';
import {ChercheurModule} from './module/chercheur/chercheur.module';
import {ChercheurRoutingModule} from './module/chercheur/chercheur-routing.module';
import {ToolbarModule} from "primeng/toolbar";
import {FileUploadModule} from "primeng/fileupload";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";
import {AppCodeModule} from "./app.code.component";
import {FullCalendarModule} from "primeng/fullcalendar";

@NgModule({
    imports: [
        CommonModule,
        AppCodeModule,
        TabViewModule,
        CalendarModule,
        AppCodeModule,
        TabViewModule,
        ButtonModule,
        PasswordModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        PanelMenuModule,
        RadioButtonModule,
        InputTextModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        DropdownModule,
        TabViewModule,
        SplitButtonModule,
        InputSwitchModule,
        InputTextareaModule,
        CalendarModule,
        PanelModule,
        MessageModule,
        CardModule,
        AdminModule,
        AdminRoutingModule,
        ChercheurModule,
        ChercheurRoutingModule,
        ToolbarModule,
        FileUploadModule,
        TableModule,
        DialogModule,
        ToastModule,
        ConfirmDialogModule,
        FullCalendarModule,

    ],

    declarations: [

        AppComponent,
        AccessDeniedComponent,
        AppComponent,
        AccessDeniedComponent,
        AppMainComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppConfigComponent,
        AppRightMenuComponent,
        AppTopBarComponent,
        AppFooterComponent,
        DashboardDemoComponent,
        FloatLabelDemoComponent,
        InvalidStateDemoComponent,
        InputDemoComponent,
        ButtonDemoComponent,
        ChartsDemoComponent,
        EmptyDemoComponent,
        FileDemoComponent,
        DocumentationComponent,
        AppCalendarComponent,
        AppTimelineDemoComponent,
        AppNotfoundComponent,
        AppErrorComponent,
        AppAccessdeniedComponent,
        HomeComponent,

    ],
    providers: [
        /*    { provide: LocationStrategy, useClass: HashLocationStrategy }, */
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        CountryService,
        CustomerService,
        EventService,
        UserService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        MenuService,
        RoleService,
        MessageService,
        ConfirmationService,
        DatePipe,
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
