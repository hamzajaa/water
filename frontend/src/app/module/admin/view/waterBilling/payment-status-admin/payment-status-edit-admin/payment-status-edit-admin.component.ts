import { Component } from '@angular/core';
import {DatePipe} from "@angular/common";
import {PaymentStatusService} from "../../../../../../controller/service/PaymentStatus.service";
import {StringUtilService} from "../../../../../../controller/service/StringUtil.service";
import {RoleService} from "../../../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {PaymentStatusVo} from "../../../../../../controller/model/PaymentStatus.model";
import {environment} from "../../../../../../../environments/environment";

@Component({
  selector: 'app-payment-status-edit-admin',
  templateUrl: './payment-status-edit-admin.component.html',
  styleUrls: ['./payment-status-edit-admin.component.scss']
})
export class PaymentStatusEditAdminComponent {



  constructor(private datePipe: DatePipe, private paymentStatusService: PaymentStatusService
      , private stringUtilService: StringUtilService
      , private roleService: RoleService
      , private messageService: MessageService
      , private router: Router
  ) {

  }

  _submitted = false;
  _validPaymentStatusCode = true;
  _validPaymentStatusLibel = true;
  _validPaymentStatusDutyEngage = true;


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
    this.paymentStatusService.edit().subscribe(paymentStatus => {
      const myIndex = this.paymentStatuss.findIndex(e => e.id === this.selectedPaymentStatus.id);
      this.paymentStatuss[myIndex] = paymentStatus;
      this.editPaymentStatusDialog = false;
      this.submitted = false;
      this.selectedPaymentStatus = new PaymentStatusVo();


    }, error => {
      console.log(error);
    });

  }

  hideEditDialog() {
    this.editPaymentStatusDialog = false;
    this.setValidation(true);
  }

  private setValidation(value: boolean) {
    this.validPaymentStatusCode = value;
    this.validPaymentStatusLibel = value;
  }

  private validateForm(): void {
    this.errorMessages = new Array<string>();
    this.validatePaymentStatusCode();
    this.validatePaymentStatusLibel();

  }

  private validatePaymentStatusCode() {
    if (this.stringUtilService.isEmpty(this.selectedPaymentStatus.code)) {
      this.errorMessages.push('code not valid');
      this.validPaymentStatusCode = false;
    } else {
      this.validPaymentStatusCode = true;
    }
  }
  private validatePaymentStatusLibel() {
    if (this.stringUtilService.isEmpty(this.selectedPaymentStatus.libel)) {
      this.errorMessages.push('Libel not valid');
      this.validPaymentStatusLibel = false;
    } else {
      this.validPaymentStatusLibel = true;
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

  get validPaymentStatusCode(): boolean {
    return this._validPaymentStatusCode;
  }

  set validPaymentStatusCode(value: boolean) {
    this._validPaymentStatusCode = value;
  }
  get validPaymentStatusLibel(): boolean {
    return this._validPaymentStatusLibel;
  }

  set validPaymentStatusLibel(value: boolean) {
    this._validPaymentStatusLibel = value;
  }

 
  get paymentStatuss(): Array<PaymentStatusVo> {
    return this.paymentStatusService.paymentStatuss;
  }

  set paymentStatuss(value: Array<PaymentStatusVo>) {
    this.paymentStatusService.paymentStatuss = value;
  }

  get selectedPaymentStatus(): PaymentStatusVo {
    return this.paymentStatusService.selectedPaymentStatus;
  }

  set selectedPaymentStatus(value: PaymentStatusVo) {
    this.paymentStatusService.selectedPaymentStatus = value;
  }

  get editPaymentStatusDialog(): boolean {
    return this.paymentStatusService.editPaymentStatusDialog;

  }

  set editPaymentStatusDialog(value: boolean) {
    this.paymentStatusService.editPaymentStatusDialog = value;
  }

  get dateFormat() {
    return environment.dateFormatEdit;
  }

  get dateFormatColumn() {
    return environment.dateFormatEdit;
  }

}
