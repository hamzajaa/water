import {Component} from '@angular/core';
import {DatePipe} from "@angular/common";
import {PaymentService} from "../../../../../../controller/service/Payment.service";
import {StringUtilService} from "../../../../../../controller/service/StringUtil.service";
import {RoleService} from "../../../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {ClientService} from "../../../../../../controller/service/Client.service";
import {ClientVo} from "../../../../../../controller/model/Client.model";
import {PaymentVo} from "../../../../../../controller/model/Payment.model";
import {environment} from "../../../../../../../environments/environment";
import {PaymentStatusService} from "../../../../../../controller/service/PaymentStatus.service";
import {PaymentStatusVo} from "../../../../../../controller/model/PaymentStatus.model";
import {PaymentCategoryService} from "../../../../../../controller/service/PaymentCategory.service";
import {PaymentCategoryVo} from "../../../../../../controller/model/PaymentCategory.model";
import {BigDecimal} from "bigdecimal.js";

@Component({
    selector: 'app-payment-create-admin',
    templateUrl: './payment-create-admin.component.html',
    styleUrls: ['./payment-create-admin.component.scss']
})
export class PaymentCreateAdminComponent {


    constructor(private datePipe: DatePipe, private paymentService: PaymentService
        , private stringUtilService: StringUtilService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
        , private clientService: ClientService
        , private paymentStatusService: PaymentStatusService
        , private paymentCategoryService: PaymentCategoryService
    ) {

    }

    _submitted = false;
    showTotalPayAndConsumptionRate = false;
    _validPaymentClient = true;
    _validPaymentPaymentStatus = true;
    _validPaymentPaymentCategory = true;
    _validPaymentPreviousNumber = true;
    _validPaymentNewNumber = true;
    _validPaymentConsumptionRate = true;
    _validPaymentTotalPay = true;
    _validPaymentDatePay = true;

    private _errorMessages = new Array<string>();

    // methods
    ngOnInit(): void {

        this.selectedPaymentClient = new ClientVo();
        this.clientService.findAll().subscribe((data) => this.clients = data);
        this.selectedPaymentPaymentStatus = new PaymentStatusVo();
        this.paymentStatusService.findAll().subscribe((data) => this.paymentStatuss = data);
        this.selectedPaymentPaymentCategory = new PaymentCategoryVo();
        this.paymentCategoryService.findAll().subscribe((data) => this.paymentCategorys = data);

    }

    public save() {
        this.submitted = true;
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.saveWithShowOption(false);
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Errors',
                detail: 'Thank you for correcting errors on the form'
            });
        }
    }

    public saveWithShowOption(showList: boolean) {
        this.paymentService.save().subscribe(payment => {
            if (payment != null) {
                this.payments.push({...payment});
                this.createPaymentDialog = false;
                this.submitted = false;
                this.selectedPayment = new PaymentVo();

            } else {
                this.messageService.add({severity: 'error', summary: 'Errors', detail: 'Payment already exist'});
            }

        }, error => {
            console.log(error);
        });
    }

    public async openCreateClient(client: string) {
        const isPermistted = await this.roleService.isPermitted('Client', 'add');
        if (isPermistted) {
            this.selectedPaymentClient = new ClientVo();
            this.createPaymentClientDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'error', detail: 'permission problem'
            });
        }
    }

    public async openCreatePaymentCategory(paymentGategory: string) {
        const isPermistted = await this.roleService.isPermitted('PaymentCategory', 'add');
        if (isPermistted) {
            this.selectedPaymentPaymentCategory = new PaymentCategoryVo();
            this.createPaymentPaymentCategoryDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'error', detail: 'permission problem'
            });
        }
    }

    public async openCreatePaymentStatus(client: string) {
        const isPermistted = await this.roleService.isPermitted('PaymentStatus', 'add');
        if (isPermistted) {
            this.selectedPaymentPaymentStatus = new PaymentStatusVo();
            this.createPaymentPaymentStatusDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'error', detail: 'permission problem'
            });
        }
    }

    hideCreateDialog() {
        this.createPaymentDialog = false;
        this.setValidation(true);
    }

    private setValidation(value: boolean) {
        this.validPaymentClient = value;
        this.validPaymentPaymentStatus = value;
        this.validPaymentPaymentCategory = value;
        this.validPaymentPreviousNumber = value;
        this.validPaymentNewNumber = value;
        // this.validPaymentConsumptionRate = value;
        // this.validPaymentTotalPay = value;
        this.validPaymentDatePay = value;
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validatePaymentClient();
        this.validatePaymentPaymentStatus();
        this.validatePaymentPaymentCategory();
        this.validatePaymentPreviousNumber();
        this.validatePaymentNewNumber();
        // this.validatePaymentConsumptionRate();
        // this.validatePaymentTotalPay();
        this.validatePaymentDatePay();

    }

    private validatePaymentClient() {
        if (this.stringUtilService.isEmpty(this.selectedPayment.clientVo)) {
            this.errorMessages.push('Client not valid');
            this.validPaymentClient = false;
        } else {
            this.validPaymentClient = true;
        }
    }

    private validatePaymentPaymentCategory() {
        if (this.stringUtilService.isEmpty(this.selectedPayment.paymentCategoryVo)) {
            this.errorMessages.push('Payment Category not valid');
            this.validPaymentPaymentCategory = false;
        } else {
            this.validPaymentPaymentCategory = true;
        }
    }

    private validatePaymentPaymentStatus() {
        if (this.stringUtilService.isEmpty(this.selectedPayment.paymentStatusVo)) {
            this.errorMessages.push('Payment Status not valid');
            this.validPaymentPaymentStatus = false;
        } else {
            this.validPaymentPaymentStatus = true;
        }
    }

    private validatePaymentPreviousNumber() {
        if (this.stringUtilService.isEmpty(this.selectedPayment.previousNumber)) {
            this.errorMessages.push('Previous Number not valid');
            this.validPaymentPreviousNumber = false;
        } else {
            this.validPaymentPreviousNumber = true;
        }
    }

    private validatePaymentNewNumber() {
        if (this.stringUtilService.isEmpty(this.selectedPayment.newNumber)) {
            this.errorMessages.push('New Number Number not valid');
            this.validPaymentNewNumber = false;
        } else {
            this.validPaymentNewNumber = true;
        }
    }

    private validatePaymentConsumptionRate() {
        if (this.stringUtilService.isEmpty(this.selectedPayment.consumptionRate)) {
            this.errorMessages.push('Consumption Rate Number not valid');
            this.validPaymentConsumptionRate = false;
        } else {
            this.validPaymentConsumptionRate = true;
        }
    }

    private validatePaymentTotalPay() {
        if (this.stringUtilService.isEmpty(this.selectedPayment.totalPay)) {
            this.errorMessages.push('Total Pay Number not valid');
            this.validPaymentTotalPay = false;
        } else {
            this.validPaymentTotalPay = true;
        }
    }

    private validatePaymentDatePay() {
        if (this.stringUtilService.isEmpty(this.selectedPayment.datePay)) {
            this.errorMessages.push('Date Pay Rate Number not valid');
            this.validPaymentDatePay = false;
        } else {
            this.validPaymentDatePay = true;
        }
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }

    get submitted(): boolean {
        return this._submitted;
    }

    get errorMessages(): string[] {
        return this._errorMessages;
    }

    set errorMessages(value: string[]) {
        this._errorMessages = value;
    }

    get payments(): Array<PaymentVo> {
        return this.paymentService.payments;
    }

    set payments(value: Array<PaymentVo>) {
        this.paymentService.payments = value;
    }

    get selectedPayment(): PaymentVo {
        return this.paymentService.selectedPayment;
    }

    set selectedPayment(value: PaymentVo) {
        this.paymentService.selectedPayment = value;
    }

    get createPaymentDialog(): boolean {
        return this.paymentService.createPaymentDialog;

    }

    set createPaymentDialog(value: boolean) {
        this.paymentService.createPaymentDialog = value;
    }

    get clients(): Array<ClientVo> {
        return this.clientService.clients;
    }

    set clients(value: Array<ClientVo>) {
        this.clientService.clients = value;
    }

    get createPaymentClientDialog(): boolean {
        return this.clientService.createClientDialog;
    }

    set createPaymentClientDialog(value: boolean) {
        this.clientService.createClientDialog = value;
    }

    get selectedPaymentClient(): ClientVo {
        return this.clientService.selectedClient;
    }

    set selectedPaymentClient(value: ClientVo) {
        this.clientService.selectedClient = value;
    }

    get paymentCategorys(): Array<PaymentCategoryVo> {
        return this.paymentCategoryService.paymentCategorys;
    }

    set paymentCategorys(value: Array<PaymentCategoryVo>) {
        this.paymentCategoryService.paymentCategorys = value;
    }

    get createPaymentPaymentCategoryDialog(): boolean {
        return this.paymentCategoryService.createPaymentCategoryDialog;
    }

    set createPaymentPaymentCategoryDialog(value: boolean) {
        this.paymentCategoryService.createPaymentCategoryDialog = value;
    }

    get selectedPaymentPaymentCategory(): PaymentCategoryVo {
        return this.paymentCategoryService.selectedPaymentCategory;
    }

    set selectedPaymentPaymentCategory(value: PaymentCategoryVo) {
        this.paymentCategoryService.selectedPaymentCategory = value;
    }

    get selectedPaymentPaymentStatus(): PaymentStatusVo {
        return this.paymentStatusService.selectedPaymentStatus;
    }

    set selectedPaymentPaymentStatus(value: PaymentStatusVo) {
        this.paymentStatusService.selectedPaymentStatus = value;
    }

    get paymentStatuss(): Array<PaymentStatusVo> {
        return this.paymentStatusService.paymentStatuss;
    }

    set paymentStatuss(value: Array<PaymentStatusVo>) {
        this.paymentStatusService.paymentStatuss = value;
    }

    get createPaymentPaymentStatusDialog(): boolean {
        return this.paymentStatusService.createPaymentStatusDialog;
    }

    set createPaymentPaymentStatusDialog(value: boolean) {
        this.paymentStatusService.createPaymentStatusDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatCreate;
    }

    get dateFormatColumn() {
        return environment.dateFormatCreate;
    }

    set validPaymentClient(value: boolean) {
        this._validPaymentClient = value;
    }

    get validPaymentClient(): boolean {
        return this._validPaymentClient;
    }

    set validPaymentPaymentCategory(value: boolean) {
        this._validPaymentPaymentCategory = value;
    }

    get validPaymentPaymentCategory(): boolean {
        return this._validPaymentPaymentCategory;
    }

    set validPaymentPaymentStatus(value: boolean) {
        this._validPaymentPaymentStatus = value;
    }

    get validPaymentPaymentStatus(): boolean {
        return this._validPaymentPaymentStatus;
    }

    set validPaymentPreviousNumber(value: boolean) {
        this._validPaymentPreviousNumber = value;
    }

    get validPaymentPreviousNumber(): boolean {
        return this._validPaymentPreviousNumber;
    }

    set validPaymentNewNumber(value: boolean) {
        this._validPaymentNewNumber = value;
    }

    get validPaymentNewNumber(): boolean {
        return this._validPaymentNewNumber;
    }

    set validPaymentConsumptionRate(value: boolean) {
        this._validPaymentConsumptionRate = value;
    }

    get validPaymentConsumptionRate(): boolean {
        return this._validPaymentConsumptionRate;
    }

    set validPaymentTotalPay(value: boolean) {
        this._validPaymentTotalPay = value;
    }

    get validPaymentTotalPay(): boolean {
        return this._validPaymentTotalPay;
    }

    set validPaymentDatePay(value: boolean) {
        this._validPaymentDatePay = value;
    }

    get validPaymentDatePay(): boolean {
        return this._validPaymentDatePay;
    }

}
