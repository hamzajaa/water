import { Component } from '@angular/core';
import {DatePipe} from "@angular/common";
import {PaymentCategoryService} from "../../../../../../controller/service/PaymentCategory.service";
import {RoleService} from "../../../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {PaymentCategoryVo} from "../../../../../../controller/model/PaymentCategory.model";
import {environment} from "../../../../../../../environments/environment";

@Component({
  selector: 'app-payment-category-view-admin',
  templateUrl: './payment-category-view-admin.component.html',
  styleUrls: ['./payment-category-view-admin.component.scss']
})
export class PaymentCategoryViewAdminComponent {



  constructor(private datePipe: DatePipe, private paymentCategoryService: PaymentCategoryService
      , private roleService: RoleService
      , private messageService: MessageService
      , private router: Router
  ) {
  }

// methods
  ngOnInit(): void {
  }

  hideViewDialog() {
    this.viewPaymentCategoryDialog = false;
  }

  // getter and setter


  get paymentCategorys(): Array<PaymentCategoryVo> {
    return this.paymentCategoryService.paymentCategorys;
  }

  set paymentCategorys(value: Array<PaymentCategoryVo>) {
    this.paymentCategoryService.paymentCategorys = value;
  }

  get selectedPaymentCategory(): PaymentCategoryVo {
    return this.paymentCategoryService.selectedPaymentCategory;
  }

  set selectedPaymentCategory(value: PaymentCategoryVo) {
    this.paymentCategoryService.selectedPaymentCategory = value;
  }

  get viewPaymentCategoryDialog(): boolean {
    return this.paymentCategoryService.viewPaymentCategoryDialog;

  }

  set viewPaymentCategoryDialog(value: boolean) {
    this.paymentCategoryService.viewPaymentCategoryDialog = value;
  }

  get dateFormat() {
    return environment.dateFormatView;
  }

  get dateFormatColumn() {
    return environment.dateFormatList;
  }



}
