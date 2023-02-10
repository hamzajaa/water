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
  selector: 'app-payment-status-create-admin',
  templateUrl: './payment-status-create-admin.component.html',
  styleUrls: ['./payment-status-create-admin.component.scss']
})
export class PaymentStatusCreateAdminComponent {


  constructor(private datePipe: DatePipe, private paymentStatusService: PaymentStatusService
      , private stringUtilService: StringUtilService
      , private roleService: RoleService
      , private messageService: MessageService
      , private router: Router

  ) {

  }

  private _errorMessages = new Array<string>();
  _submitted = false;
  _validPaymentStatusCode = true;
  _validPaymentStatusLibel = true;

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
    this.paymentStatusService.save().subscribe(paymentStatuss => {
      if (paymentStatuss != null) {
        this.paymentStatuss.push({...paymentStatuss});
        this.createPaymentStatusDialog = false;
        this.submitted = false;
        this.selectedPaymentStatus = new PaymentStatusVo();

      } else {
        this.messageService.add({severity: 'error', summary: 'Errors', detail: 'PaymentStatus already exist'});
      }

    }, error => {
      console.log(error);
    });
  }


  hideCreateDialog() {
    this.createPaymentStatusDialog = false;
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

  get createPaymentStatusDialog(): boolean {
    return this.paymentStatusService.createPaymentStatusDialog;

  }

  set createPaymentStatusDialog(value: boolean) {
    this.paymentStatusService.createPaymentStatusDialog = value;
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

  get submitted(): boolean {
    return this._submitted;
  }

  set submitted(value: boolean) {
    this._submitted = value;
  }


}
