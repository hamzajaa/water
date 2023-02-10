import { Component } from '@angular/core';
import {DatePipe} from "@angular/common";
import {PaymentCategoryService} from "../../../../../../controller/service/PaymentCategory.service";
import {StringUtilService} from "../../../../../../controller/service/StringUtil.service";
import {RoleService} from "../../../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {PaymentCategoryVo} from "../../../../../../controller/model/PaymentCategory.model";
import {environment} from "../../../../../../../environments/environment";

@Component({
  selector: 'app-payment-category-create-admin',
  templateUrl: './payment-category-create-admin.component.html',
  styleUrls: ['./payment-category-create-admin.component.scss']
})
export class PaymentCategoryCreateAdminComponent {

  constructor(private datePipe: DatePipe, private paymentCategoryService: PaymentCategoryService
      , private stringUtilService: StringUtilService
      , private roleService: RoleService
      , private messageService: MessageService
      , private router: Router

  ) {

  }

  private _errorMessages = new Array<string>();
  _submitted = false;
  _validPaymentCategoryCode = true;
  _validPaymentCategoryUnityPrice = true;
  _validPaymentCategoryDutyEngage = true;

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
    this.paymentCategoryService.save().subscribe(paymentCategorys => {
      if (paymentCategorys != null) {
        this.paymentCategorys.push({...paymentCategorys});
        this.createPaymentCategoryDialog = false;
        this.submitted = false;
        this.selectedPaymentCategory = new PaymentCategoryVo();

      } else {
        this.messageService.add({severity: 'error', summary: 'Errors', detail: 'PaymentCategory already exist'});
      }

    }, error => {
      console.log(error);
    });
  }


  hideCreateDialog() {
    this.createPaymentCategoryDialog = false;
    this.setValidation(true);
  }

  private setValidation(value: boolean) {
    this.validPaymentCategoryCode = value;
    this.validPaymentCategoryUnityPrice = value;
    this.validPaymentCategoryDutyEngage = value;
  }

  private validateForm(): void {
    this.errorMessages = new Array<string>();
    this.validatePaymentCategoryCode();
    this.validatePaymentCategoryUnityPrice();
    this.validatePaymentCategoryDutyEngage();

  }

  private validatePaymentCategoryCode() {
    if (this.stringUtilService.isEmpty(this.selectedPaymentCategory.code)) {
      this.errorMessages.push('code not valid');
      this.validPaymentCategoryCode = false;
    } else {
      this.validPaymentCategoryCode = true;
    }
  }
  private validatePaymentCategoryUnityPrice() {
    if (this.stringUtilService.isEmpty(this.selectedPaymentCategory.unityPrice)) {
      this.errorMessages.push('Unity Price not valid');
      this.validPaymentCategoryUnityPrice = false;
    } else {
      this.validPaymentCategoryUnityPrice = true;
    }
  }
  private validatePaymentCategoryDutyEngage() {
    if (this.stringUtilService.isEmpty(this.selectedPaymentCategory.dutyEngage)) {
      this.errorMessages.push('Duty Engage not valid');
      this.validPaymentCategoryDutyEngage = false;
    } else {
      this.validPaymentCategoryDutyEngage = true;
    }
  }






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

  get createPaymentCategoryDialog(): boolean {
    return this.paymentCategoryService.createPaymentCategoryDialog;

  }

  set createPaymentCategoryDialog(value: boolean) {
    this.paymentCategoryService.createPaymentCategoryDialog = value;
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

  get validPaymentCategoryCode(): boolean {
    return this._validPaymentCategoryCode;
  }

  set validPaymentCategoryCode(value: boolean) {
    this._validPaymentCategoryCode = value;
  }
  get validPaymentCategoryUnityPrice(): boolean {
    return this._validPaymentCategoryUnityPrice;
  }

  set validPaymentCategoryUnityPrice(value: boolean) {
    this._validPaymentCategoryUnityPrice = value;
  }

  get validPaymentCategoryDutyEngage(): boolean {
    return this._validPaymentCategoryDutyEngage;
  }

  set validPaymentCategoryDutyEngage(value: boolean) {
    this._validPaymentCategoryDutyEngage = value;
  }

  get submitted(): boolean {
    return this._submitted;
  }

  set submitted(value: boolean) {
    this._submitted = value;
  }


}
