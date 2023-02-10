import { Component } from '@angular/core';
import {DatePipe} from "@angular/common";
import {ExpensesCategoryService} from "../../../../../../controller/service/ExpensesCategory.service";
import {StringUtilService} from "../../../../../../controller/service/StringUtil.service";
import {RoleService} from "../../../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {ExpensesCategoryVo} from "../../../../../../controller/model/ExpensesCategory.model";
import {environment} from "../../../../../../../environments/environment";

@Component({
  selector: 'app-expenses-category-edit-admin',
  templateUrl: './expenses-category-edit-admin.component.html',
  styleUrls: ['./expenses-category-edit-admin.component.scss']
})
export class ExpensesCategoryEditAdminComponent {



  constructor(private datePipe: DatePipe, private expensesCategoryService: ExpensesCategoryService
      , private stringUtilService: StringUtilService
      , private roleService: RoleService
      , private messageService: MessageService
      , private router: Router
  ) {

  }

  _submitted = false;
  _validExpensesCategoryUserName = true;
  _validExpensesCategoryName = true;
  _validExpensesCategoryCni = true;


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
    this.expensesCategoryService.edit().subscribe(expensesCategory => {
      const myIndex = this.expensesCategorys.findIndex(e => e.id === this.selectedExpensesCategory.id);
      this.expensesCategorys[myIndex] = expensesCategory;
      this.editExpensesCategoryDialog = false;
      this.submitted = false;
      this.selectedExpensesCategory = new ExpensesCategoryVo();


    }, error => {
      console.log(error);
    });

  }

  hideEditDialog() {
    this.editExpensesCategoryDialog = false;
    this.setValidation(true);
  }

  private setValidation(value: boolean) {
    this.validExpensesCategoryUserName = value;
    this.validExpensesCategoryCni = value;
    this.validExpensesCategoryName = value;
  }

//validation methods
  private validateForm(): void {
    this.errorMessages = new Array<string>();
    this.validateExpensesCategoryName();

  }


  private validateExpensesCategoryName() {
    if (this.stringUtilService.isEmpty(this.selectedExpensesCategory.name)) {
      this.errorMessages.push('Name not valid');
      this.validExpensesCategoryName = false;
    } else {
      this.validExpensesCategoryName = true;
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


  get validExpensesCategoryUserName(): boolean {
    return this._validExpensesCategoryUserName;
  }

  set validExpensesCategoryUserName(value: boolean) {
    this._validExpensesCategoryUserName = value;
  }

  get validExpensesCategoryCni(): boolean {
    return this._validExpensesCategoryCni;
  }

  set validExpensesCategoryCni(value: boolean) {
    this._validExpensesCategoryCni = value;
  }


  get validExpensesCategoryName(): boolean {
    return this._validExpensesCategoryName;
  }

  set validExpensesCategoryName(value: boolean) {
    this._validExpensesCategoryName = value;
  }

  get expensesCategorys(): Array<ExpensesCategoryVo> {
    return this.expensesCategoryService.expensesCategorys;
  }

  set expensesCategorys(value: Array<ExpensesCategoryVo>) {
    this.expensesCategoryService.expensesCategorys = value;
  }

  get selectedExpensesCategory(): ExpensesCategoryVo {
    return this.expensesCategoryService.selectedExpensesCategory;
  }

  set selectedExpensesCategory(value: ExpensesCategoryVo) {
    this.expensesCategoryService.selectedExpensesCategory = value;
  }

  get editExpensesCategoryDialog(): boolean {
    return this.expensesCategoryService.editExpensesCategoryDialog;

  }

  set editExpensesCategoryDialog(value: boolean) {
    this.expensesCategoryService.editExpensesCategoryDialog = value;
  }

  get dateFormat() {
    return environment.dateFormatEdit;
  }

  get dateFormatColumn() {
    return environment.dateFormatEdit;
  }

}
