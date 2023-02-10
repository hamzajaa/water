import {Component} from '@angular/core';
import {DatePipe} from "@angular/common";
import {PaymentService} from "../../../../../../controller/service/Payment.service";
import {RoleService} from "../../../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {ClientService} from "../../../../../../controller/service/Client.service";
import {ClientVo} from "../../../../../../controller/model/Client.model";
import {PaymentVo} from "../../../../../../controller/model/Payment.model";
import {environment} from "../../../../../../../environments/environment";
import {PaymentStatusVo} from "../../../../../../controller/model/PaymentStatus.model";
import {PaymentStatusService} from "../../../../../../controller/service/PaymentStatus.service";
import {PaymentCategoryVo} from "../../../../../../controller/model/PaymentCategory.model";
import {PaymentCategoryService} from "../../../../../../controller/service/PaymentCategory.service";

@Component({
    selector: 'app-payment-view-admin',
    templateUrl: './payment-view-admin.component.html',
    styleUrls: ['./payment-view-admin.component.scss']
})
export class PaymentViewAdminComponent {


    constructor(private datePipe: DatePipe, private paymentService: PaymentService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
        , private clientService: ClientService
        , private paymentStatusService: PaymentStatusService
        , private paymentCategoryService: PaymentCategoryService
    ) {
    }

// methods
    ngOnInit(): void {
        this.selectedClient = new ClientVo();
        this.clientService.findAll().subscribe((data) => this.clients = data);

        this.selectedPaymentStatus = new PaymentStatusVo();
        this.paymentStatusService.findAll().subscribe((data) => this.paymentStatuss = data);

        this.selectedPaymentPaymentCategory = new PaymentCategoryVo();
        this.paymentCategoryService.findAll().subscribe((data) => this.paymentCategorys = data);
    }

    hideViewDialog() {
        this.viewPaymentDialog = false;
    }

    // getters and setters

    set payments(value: Array<PaymentVo>) {
        this.paymentService.payments = value;
    }

    get payments(): Array<PaymentVo> {
        return this.paymentService.payments;
    }

    get selectedPayment(): PaymentVo {
        return this.paymentService.selectedPayment;
    }

    set selectedPayment(value: PaymentVo) {
        this.paymentService.selectedPayment = value;
    }

    get viewPaymentDialog(): boolean {
        return this.paymentService.viewPaymentDialog;

    }

    set viewPaymentDialog(value: boolean) {
        this.paymentService.viewPaymentDialog = value;
    }

    get selectedClient(): ClientVo {
        return this.clientService.selectedClient;
    }

    set selectedClient(value: ClientVo) {
        this.clientService.selectedClient = value;
    }

    get clients(): Array<ClientVo> {
        return this.clientService.clients;
    }

    set clients(value: Array<ClientVo>) {
        this.clientService.clients = value;
    }

    get editClientDialog(): boolean {
        return this.clientService.editClientDialog;
    }

    set editClientDialog(value: boolean) {
        this.clientService.editClientDialog = value;
    }

    get selectedPaymentPaymentCategory(): PaymentCategoryVo {
        return this.paymentCategoryService.selectedPaymentCategory;
    }


    get paymentCategorys(): Array<PaymentCategoryVo> {
        return this.paymentCategoryService.paymentCategorys;
    }

    set paymentCategorys(value: Array<PaymentCategoryVo>) {
        this.paymentCategoryService.paymentCategorys = value;
    }

    set selectedPaymentPaymentCategory(value: PaymentCategoryVo) {
        this.paymentCategoryService.selectedPaymentCategory = value;
    }


    get selectedPaymentStatus(): PaymentStatusVo {
        return this.paymentStatusService.selectedPaymentStatus;
    }

    set selectedPaymentStatus(value: PaymentStatusVo) {
        this.paymentStatusService.selectedPaymentStatus = value;
    }

    get paymentStatuss(): Array<PaymentStatusVo> {
        return this.paymentStatusService.paymentStatuss;
    }

    set paymentStatuss(value: Array<PaymentStatusVo>) {
        this.paymentStatusService.paymentStatuss = value;
    }

    get editPaymentStatusDialog(): boolean {
        return this.paymentStatusService.editPaymentStatusDialog;
    }

    set editPaymentStatusDialog(value: boolean) {
        this.paymentStatusService.editPaymentStatusDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }


}
