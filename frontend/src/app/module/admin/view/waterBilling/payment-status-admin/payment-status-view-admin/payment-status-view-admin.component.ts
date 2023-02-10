import { Component } from '@angular/core';
import {DatePipe} from "@angular/common";
import {PaymentStatusService} from "../../../../../../controller/service/PaymentStatus.service";
import {RoleService} from "../../../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {PaymentStatusVo} from "../../../../../../controller/model/PaymentStatus.model";
import {environment} from "../../../../../../../environments/environment";

@Component({
  selector: 'app-payment-status-view-admin',
  templateUrl: './payment-status-view-admin.component.html',
  styleUrls: ['./payment-status-view-admin.component.scss']
})
export class PaymentStatusViewAdminComponent {

  constructor(private datePipe: DatePipe, private paymentStatusService: PaymentStatusService
      , private roleService: RoleService
      , private messageService: MessageService
      , private router: Router
  ) {
  }

// methods
  ngOnInit(): void {
  }

  hideViewDialog() {
    this.viewPaymentStatusDialog = false;
  }

  // getter and setter


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

  get viewPaymentStatusDialog(): boolean {
    return this.paymentStatusService.viewPaymentStatusDialog;

  }

  set viewPaymentStatusDialog(value: boolean) {
    this.paymentStatusService.viewPaymentStatusDialog = value;
  }

  get dateFormat() {
    return environment.dateFormatView;
  }

  get dateFormatColumn() {
    return environment.dateFormatList;
  }



}
