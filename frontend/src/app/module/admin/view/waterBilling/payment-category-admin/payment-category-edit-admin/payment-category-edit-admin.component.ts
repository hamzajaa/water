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
  selector: 'app-payment-category-edit-admin',
  templateUrl: './payment-category-edit-admin.component.html',
  styleUrls: ['./payment-category-edit-admin.component.scss']
})
export class PaymentCategoryEditAdminComponent {


  constructor(private datePipe: DatePipe, private paymentCategoryService: PaymentCategoryService
      , private stringUtilService: StringUtilService
      , private roleService: RoleService
      , private messageService: MessageService
      , private router: Router
  ) {

  }

  _submitted = false;
  _validPaymentCategoryCode = true;
  _validPaymentCategoryUnityPrice = true;
  _validPaymentCategoryDutyEngage = true;


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
    this.paymentCategoryService.edit().subscribe(paymentCategory => {
      const myIndex = this.paymentCategorys.findIndex(e => e.id === this.selectedPaymentCategory.id);
      this.paymentCategorys[myIndex] = paymentCategory;
      this.editPaymentCategoryDialog = false;
      this.submitted = false;
      this.selectedPaymentCategory = new PaymentCategoryVo();


    }, error => {
      console.log(error);
    });

  }

  hideEditDialog() {
    this.editPaymentCategoryDialog = false;
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
      this.errorMessages.push('UnityPrice not valid');
      this.validPaymentCategoryUnityPrice = false;
    } else {
      this.validPaymentCategoryUnityPrice = true;
    }
  }
  private validatePaymentCategoryDutyEngage() {
    if (this.stringUtilService.isEmpty(this.selectedPaymentCategory.dutyEngage)) {
      this.errorMessages.push('DutyEngage not valid');
      this.validPaymentCategoryDutyEngage = false;
    } else {
      this.validPaymentCategoryDutyEngage = true;
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

  get editPaymentCategoryDialog(): boolean {
    return this.paymentCategoryService.editPaymentCategoryDialog;

  }

  set editPaymentCategoryDialog(value: boolean) {
    this.paymentCategoryService.editPaymentCategoryDialog = value;
  }

  get dateFormat() {
    return environment.dateFormatEdit;
  }

  get dateFormatColumn() {
    return environment.dateFormatEdit;
  }

}
