import { Component } from '@angular/core';
import {DatePipe} from "@angular/common";
import {ClientService} from "../../../../../../controller/service/Client.service";
import {StringUtilService} from "../../../../../../controller/service/StringUtil.service";
import {RoleService} from "../../../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {ClientVo} from "../../../../../../controller/model/Client.model";
import {environment} from "../../../../../../../environments/environment";

@Component({
  selector: 'app-client-create-admin',
  templateUrl: './client-create-admin.component.html',
  styleUrls: ['./client-create-admin.component.scss']
})
export class ClientCreateAdminComponent {

  constructor(private datePipe: DatePipe, private clientsService: ClientService
      , private stringUtilService: StringUtilService
      , private roleService: RoleService
      , private messageService: MessageService
      , private router: Router

  ) {

  }

  private _errorMessages = new Array<string>();
  _submitted = false;
  _validClientAddress = true;
  _validClientCni = true;

  _validClientUserName = true;
  _validClientCounterNumber = true;
  _validClientRecordDate = true;
  _validClientPhone = true;
  private _validDutyEngagePrice = true;

  ngOnInit(): void {

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
    this.clientsService.save().subscribe(clients => {
      if (clients != null) {
        this.clients.push({...clients});
        this.createClientDialog = false;
        this.submitted = false;
        this.selectedClient = new ClientVo();

      } else {
        this.messageService.add({severity: 'error', summary: 'Errors', detail: 'Client already exist'});
      }

    }, error => {
      console.log(error);
    });
  }

  
  hideCreateDialog() {
    this.createClientDialog = false;
    this.setValidation(true);
  }

  private setValidation(value: boolean) {
    this.validClientUserName = value;
    this.validClientCni = value;
    this.validClientUserName = value;
    this.validClientCounterNumber = value;
    this.validClientRecordDate = value;
    this.validClientPhone = value;
    this.validDutyEngagePrice = value;
  }

  private validateForm(): void {
    this.errorMessages = new Array<string>();
    this.validateClientAddress();
    this.validateClientCni();
    this.validateClientUserName();
    this.validateClientCounterNumber();
    this.validateClientRecordDate();
    this.validateClientPhone();
    this.validateDutyEngagePrice();

  }

  private validateClientAddress() {
    if (this.stringUtilService.isEmpty(this.selectedClient.address)) {
      this.errorMessages.push('Address not valid');
      this.validClientAddress = false;
    } else {
      this.validClientAddress = true;
    }
  }

  private validateClientCni() {
    if (this.stringUtilService.isEmpty(this.selectedClient.cni)) {
      this.errorMessages.push('lastname not valid');
      this.validClientCni = false;
    } else {
      this.validClientCni = true;
    }
  }

  private validateClientUserName() {
    if (this.stringUtilService.isEmpty(this.selectedClient.userName)) {
      this.errorMessages.push('UserName not valid');
      this.validClientUserName = false;
    } else {
      this.validClientUserName = true;
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


  get validDutyEngagePrice(): boolean {
    return this._validDutyEngagePrice;
  }

  set validDutyEngagePrice(value: boolean) {
    this._validDutyEngagePrice = value;
  }

  get validClientCni(): boolean {
    return this._validClientCni;
  }

  set validClientCni(value: boolean) {
    this._validClientCni = value;
  }
  get validClientUserName(): boolean {
    return this._validClientUserName;
  }

  set validClientUserName(value: boolean) {
    this._validClientUserName = value;
  }


  get clients(): Array<ClientVo> {
    return this.clientsService.clients;
  }

  set clients(value: Array<ClientVo>) {
    this.clientsService.clients = value;
  }

  get selectedClient(): ClientVo {
    return this.clientsService.selectedClient;
  }

  set selectedClient(value: ClientVo) {
    this.clientsService.selectedClient = value;
  }

  get createClientDialog(): boolean {
    return this.clientsService.createClientDialog;

  }

  set createClientDialog(value: boolean) {
    this.clientsService.createClientDialog = value;
  }

  get dateFormat() {
    return environment.dateFormatCreate;
  }

  get dateFormatColumn() {
    return environment.dateFormatCreate;
  }


  get errorMessages(): string[] {
    return this._errorMessages;
  }

  set errorMessages(value: string[]) {
    this._errorMessages = value;
  }

  get validClientAddress(): boolean {
    return this._validClientAddress;
  }

  set validClientAddress(value: boolean) {
    this._validClientAddress = value;
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

  get validClientPhone(): boolean {
    return this._validClientPhone;
  }

  set validClientPhone(value: boolean) {
    this._validClientPhone = value;
  }
  get submitted(): boolean {
    return this._submitted;
  }

  set submitted(value: boolean) {
    this._submitted = value;
  }


}
