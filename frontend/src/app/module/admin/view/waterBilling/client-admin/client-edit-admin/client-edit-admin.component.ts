import {Component} from '@angular/core';
import {DatePipe} from "@angular/common";
import {ClientService} from "../../../../../../controller/service/Client.service";
import {StringUtilService} from "../../../../../../controller/service/StringUtil.service";
import {RoleService} from "../../../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {ClientVo} from "../../../../../../controller/model/Client.model";
import {environment} from "../../../../../../../environments/environment";

@Component({
    selector: 'app-client-edit-admin',
    templateUrl: './client-edit-admin.component.html',
    styleUrls: ['./client-edit-admin.component.scss']
})
export class ClientEditAdminComponent {


    constructor(private datePipe: DatePipe, private clientService: ClientService
        , private stringUtilService: StringUtilService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {

    }

    _submitted = false;
    _validClientUserName = true;
    _validClientAddress = true;
    _validClientCni = true;
    _validClientCounterNumber = true;
    _validClientRecordDate = true;
    _validClientPhone = true;
    _validDutyEngagePrice = true;


// methods
    ngOnInit(): void {

    }

    public edit() {
        this.submitted = true;
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.editWithShowOption(false);
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Errors',
                detail: 'Thank you for correcting errors on the form'
            });
        }
    }

    public editWithShowOption(showList: boolean) {
        this.clientService.edit().subscribe(client => {
            const myIndex = this.clients.findIndex(e => e.id === this.selectedClient.id);
            this.clients[myIndex] = client;
            this.editClientDialog = false;
            this.submitted = false;
            this.selectedClient = new ClientVo();


        }, error => {
            console.log(error);
        });

    }

    hideEditDialog() {
        this.editClientDialog = false;
        this.setValidation(true);
    }

    private setValidation(value: boolean) {
        this.validClientUserName = value;
        this.validClientCni = value;
        this.validClientAddress = value;
        this.validClientCounterNumber = value;
        this.validClientRecordDate = value;
        this.validClientPhone = value;
        this.validDutyEngagePrice = value;

    }

//validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateClientUserName();
        this.validateClientCni();
        this.validateClientAddress();
        this.validateClientCounterNumber();
        this.validateClientRecordDate();
        this.validateClientPhone();
        this.validateDutyEngagePrice();

    }

    private validateClientUserName() {
        if (this.stringUtilService.isEmpty(this.selectedClient.userName)) {
            this.errorMessages.push('User Name not valid');
            this.validClientUserName = false;
        } else {
            this.validClientUserName = true;
        }
    }

    private validateClientCni() {
        if (this.stringUtilService.isEmpty(this.selectedClient.cni)) {
            this.errorMessages.push('Cni not valid');
            this.validClientCni = false;
        } else {
            this.validClientCni = true;
        }
    }

    private validateClientAddress() {
        if (this.stringUtilService.isEmpty(this.selectedClient.address)) {
            this.errorMessages.push('Address not valid');
            this.validClientAddress = false;
        } else {
            this.validClientAddress = true;
        }
    }

    private validateClientCounterNumber() {
        if (this.stringUtilService.isEmpty(this.selectedClient.counterNumber)) {
            this.errorMessages.push('Counter Number not valid');
            this.validClientCounterNumber = false;
        } else {
            this.validClientCounterNumber = true;
        }
    }

    private validateClientRecordDate() {
        if (this.stringUtilService.isEmpty(this.selectedClient.recordDate)) {
            this.errorMessages.push('Record Date not valid');
            this.validClientRecordDate = false;
        } else {
            this.validClientRecordDate = true;
        }
    }
    private validateClientPhone() {
        if (this.stringUtilService.isEmpty(this.selectedClient.phone)) {
            this.errorMessages.push('Phone not valid');
            this.validClientPhone = false;
        } else {
            this.validClientPhone = true;
        }
    }

    private validateDutyEngagePrice() {
        if (this.stringUtilService.isEmpty(this.selectedClient.dutyEngagePrice)) {
            this.errorMessages.push('Duty Engage Price not valid');
            this.validDutyEngagePrice = false;
        } else {
            this.validDutyEngagePrice = true;
        }
    }



    //getter and setter

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }

    private _errorMessages = new Array<string>();

    get errorMessages(): string[] {
        return this._errorMessages;
    }

    set errorMessages(value: string[]) {
        this._errorMessages = value;
    }


    get validClientUserName(): boolean {
        return this._validClientUserName;
    }

    set validClientUserName(value: boolean) {
        this._validClientUserName = value;
    }

    get validClientCni(): boolean {
        return this._validClientCni;
    }

    set validClientCni(value: boolean) {
        this._validClientCni = value;
    }

    get validClientPhone(): boolean {
        return this._validClientPhone;
    }

    set validClientPhone(value: boolean) {
        this._validClientPhone = value;
    }

    get validClientCounterNumber(): boolean {
        return this._validClientCounterNumber;
    }

    set validClientCounterNumber(value: boolean) {
        this._validClientCounterNumber = value;
    }

    get validClientRecordDate(): boolean {
        return this._validClientRecordDate;
    }

    set validClientRecordDate(value: boolean) {
        this._validClientRecordDate = value;
    }

    get validClientAddress(): boolean {
        return this._validClientAddress;
    }

    set validClientAddress(value: boolean) {
        this._validClientAddress = value;
    }

    get clients(): Array<ClientVo> {
        return this.clientService.clients;
    }

    set clients(value: Array<ClientVo>) {
        this.clientService.clients = value;
    }

    get selectedClient(): ClientVo {
        return this.clientService.selectedClient;
    }

    set selectedClient(value: ClientVo) {
        this.clientService.selectedClient = value;
    }

    get editClientDialog(): boolean {
        return this.clientService.editClientDialog;

    }

    set editClientDialog(value: boolean) {
        this.clientService.editClientDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatEdit;
    }

    get dateFormatColumn() {
        return environment.dateFormatEdit;
    }

    get validDutyEngagePrice(): boolean {
        return this._validDutyEngagePrice;
    }

    set validDutyEngagePrice(value: boolean) {
        this._validDutyEngagePrice = value;
    }

}
