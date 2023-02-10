import { Component } from '@angular/core';
import {DatePipe} from "@angular/common";
import {ExpensesService} from "../../../../../../controller/service/Expenses.service";
import {StringUtilService} from "../../../../../../controller/service/StringUtil.service";
import {RoleService} from "../../../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {ExpensesCategoryService} from "../../../../../../controller/service/ExpensesCategory.service";
import {ExpensesVo} from "../../../../../../controller/model/Expenses.model";
import {ExpensesCategoryVo} from "../../../../../../controller/model/ExpensesCategory.model";
import {environment} from "../../../../../../../environments/environment";

@Component({
  selector: 'app-expenses-edit-admin',
  templateUrl: './expenses-edit-admin.component.html',
  styleUrls: ['./expenses-edit-admin.component.scss']
})
export class ExpensesEditAdminComponent {


  constructor(private datePipe: DatePipe, private expensesService: ExpensesService
      , private stringUtilService: StringUtilService
      , private roleService: RoleService
      , private messageService: MessageService
      , private router: Router
      , private expensesCategoryService: ExpensesCategoryService
      
  ) {

  }

  _validExpensesExpensesCategory = true;

  _submitted = false;

  _validExpensesDateExpense = true;

  private _errorMessages = new Array<string>();

  _validExpensesTitle = true;

  _validExpensesAmount = true;

// methods
  ngOnInit(): void {

    this.selectedExpensesCategory = new ExpensesCategoryVo();
    this.expensesCategoryService.findAll().subscribe((data) => this.expensesCategorys = data);
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
    this.expensesService.edit().subscribe(expenses => {
      const myIndex = this.expensess.findIndex(e => e.id === this.selectedExpenses.id);
      this.expensess[myIndex] = expenses;
      this.editExpensesDialog = false;
      this.submitted = false;
      this.selectedExpenses = new ExpensesVo();


    }, error => {
      console.log(error);
    });

  }

//openPopup
  public async openCreateExpensesCategory(expensesCategory: string) {
    const isPermistted = await this.roleService.isPermitted('ExpensesCategory', 'edit');
    if (isPermistted) {
      this.selectedExpensesCategory = new ExpensesCategoryVo();
      this.createExpensesCategoryDialog = true;
    } else {
      this.messageService.add({
        severity: 'error', summary: 'error', detail: 'permission problem'
      });
    }
  }

  hideEditDialog() {
    this.editExpensesDialog = false;
    this.setValidation(true);
  }
//validation methods

  private setValidation(value: boolean) {
    this.validExpensesExpensesCategory = value;
    this.validExpensesTitle = value;
    this.validExpensesAmount = value;
    this.validExpensesDateExpense = value;
  }

  private validateForm(): void {
    this.errorMessages = new Array<string>();
    this.validateExpensesExpensesCategory();
    this.validateExpensesTitle();
    this.validateExpensesAmount();
    this.validateExpensesDateExpense();

  }

  private validateExpensesExpensesCategory() {
    if (this.stringUtilService.isEmpty(this.selectedExpenses.expensesCategoryVo)) {
      this.errorMessages.push('ExpensesCategory not valid');
      this.validExpensesExpensesCategory = false;
    } else {
      this.validExpensesExpensesCategory = true;
    }
  }

  private validateExpensesTitle() {
    if (this.stringUtilService.isEmpty(this.selectedExpenses.title)) {
      this.errorMessages.push('Title not valid');
      this.validExpensesTitle = false;
    } else {
      this.validExpensesTitle = true;
    }
  }

  private validateExpensesAmount() {
    if (this.stringUtilService.isEmpty(this.selectedExpenses.amount)) {
      this.errorMessages.push('Amount not valid');
      this.validExpensesAmount = false;
    } else {
      this.validExpensesAmount = true;
    }
  }

  private validateExpensesDateExpense() {
    if (this.stringUtilService.isEmpty(this.selectedExpenses.dateExpense)) {
      this.errorMessages.push('Date Expense not valid');
      this.validExpensesDateExpense = false;
    } else {
      this.validExpensesDateExpense = true;
    }
  }



  // getters and setters


  get submitted(): boolean {
    return this._submitted;
  }
  set submitted(value: boolean) {
    this._submitted = value;
  }

  get errorMessages(): string[] {
    return this._errorMessages;
  }

  set errorMessages(value: string[]) {
    this._errorMessages = value;
  }

  get validExpensesExpensesCategory(): boolean {
    return this._validExpensesExpensesCategory;
  }

  set validExpensesExpensesCategory(value: boolean) {
    this._validExpensesExpensesCategory = value;
  }
  get validExpensesDateExpense(): boolean {
    return this._validExpensesDateExpense;
  }

  set validExpensesDateExpense(value: boolean) {
    this._validExpensesDateExpense = value;
  }

  get validExpensesAmount(): boolean {
    return this._validExpensesAmount;
  }

  set validExpensesAmount(value: boolean) {
    this._validExpensesAmount = value;
  }


  get validExpensesTitle(): boolean {
    return this._validExpensesTitle;
  }

  set validExpensesTitle(value: boolean) {
    this._validExpensesTitle = value;
  }

  get expensess(): Array<ExpensesVo> {
    return this.expensesService.expensess;
  }

  set expensess(value: Array<ExpensesVo>) {
    this.expensesService.expensess = value;
  }

  get selectedExpenses(): ExpensesVo {
    return this.expensesService.selectedExpenses;
  }

  set selectedExpenses(value: ExpensesVo) {
    this.expensesService.selectedExpenses = value;
  }

  get editExpensesDialog(): boolean {
    return this.expensesService.editExpensesDialog;

  }

  set editExpensesDialog(value: boolean) {
    this.expensesService.editExpensesDialog = value;
  }

  get selectedExpensesCategory(): ExpensesCategoryVo {
    return this.expensesCategoryService.selectedExpensesCategory;
  }

  set selectedExpensesCategory(value: ExpensesCategoryVo) {
    this.expensesCategoryService.selectedExpensesCategory = value;
  }

  get expensesCategorys(): Array<ExpensesCategoryVo> {
    return this.expensesCategoryService.expensesCategorys;
  }

  set expensesCategorys(value: Array<ExpensesCategoryVo>) {
    this.expensesCategoryService.expensesCategorys = value;
  }

  get createExpensesCategoryDialog(): boolean {
    return this.expensesCategoryService.createExpensesCategoryDialog;
  }

  set createExpensesCategoryDialog(value: boolean) {
    this.expensesCategoryService.createExpensesCategoryDialog = value;
  }
  get dateFormat() {
    return environment.dateFormatEdit;
  }

  get dateFormatColumn() {
    return environment.dateFormatEdit;
  }

}
