import { Component } from '@angular/core';
import {DatePipe} from "@angular/common";
import {StringUtilService} from "../../../../../../controller/service/StringUtil.service";
import {RoleService} from "../../../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {environment} from "../../../../../../../environments/environment";
import {ExpensesCategoryVo} from "../../../../../../controller/model/ExpensesCategory.model";
import {ExpensesCategoryService} from "../../../../../../controller/service/ExpensesCategory.service";

@Component({
  selector: 'app-expenses-category-create-admin',
  templateUrl: './expenses-category-create-admin.component.html',
  styleUrls: ['./expenses-category-create-admin.component.scss']
})
export class ExpensesCategoryCreateAdminComponent {

  constructor(private datePipe: DatePipe, private expensesCategorysService: ExpensesCategoryService
      , private stringUtilService: StringUtilService
      , private roleService: RoleService
      , private messageService: MessageService
      , private router: Router

  ) {

  }

  private _errorMessages = new Array<string>();
  _submitted = false;
  _validExpensesCategoryName = true;

  // methods
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
    this.expensesCategorysService.save().subscribe(expensesCategorys => {
      if (expensesCategorys != null) {
        this.expensesCategorys.push({...expensesCategorys});
        this.createExpensesCategoryDialog = false;
        this.submitted = false;
        this.selectedExpensesCategory = new ExpensesCategoryVo();

      } else {
        this.messageService.add({severity: 'error', summary: 'Errors', detail: 'ExpensesCategory already exist'});
      }

    }, error => {
      console.log(error);
    });
  }


  hideCreateDialog() {
    this.createExpensesCategoryDialog = false;
    this.setValidation(true);
  }

  private setValidation(value: boolean) {
    this.validExpensesCategoryName = value;
  }

  private validateForm(): void {
    this.errorMessages = new Array<string>();
    this.validateExpensesCategoryName();

  }

  private validateExpensesCategoryName() {
    if (this.stringUtilService.isEmpty(this.selectedExpensesCategory.name)) {
      this.errorMessages.push('name not valid');
      this.validExpensesCategoryName = false;
    } else {
      this.validExpensesCategoryName = true;
    }
  }






  get expensesCategorys(): Array<ExpensesCategoryVo> {
    return this.expensesCategorysService.expensesCategorys;
  }

  set expensesCategorys(value: Array<ExpensesCategoryVo>) {
    this.expensesCategorysService.expensesCategorys = value;
  }

  get selectedExpensesCategory(): ExpensesCategoryVo {
    return this.expensesCategorysService.selectedExpensesCategory;
  }

  set selectedExpensesCategory(value: ExpensesCategoryVo) {
    this.expensesCategorysService.selectedExpensesCategory = value;
  }

  get createExpensesCategoryDialog(): boolean {
    return this.expensesCategorysService.createExpensesCategoryDialog;

  }

  set createExpensesCategoryDialog(value: boolean) {
    this.expensesCategorysService.createExpensesCategoryDialog = value;
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

  get validExpensesCategoryName(): boolean {
    return this._validExpensesCategoryName;
  }

  set validExpensesCategoryName(value: boolean) {
    this._validExpensesCategoryName = value;
  }

  get submitted(): boolean {
    return this._submitted;
  }

  set submitted(value: boolean) {
    this._submitted = value;
  }


}
