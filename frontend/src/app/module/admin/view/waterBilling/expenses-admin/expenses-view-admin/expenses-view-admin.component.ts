import { Component } from '@angular/core';
import {DatePipe} from "@angular/common";
import {ExpensesService} from "../../../../../../controller/service/Expenses.service";
import {RoleService} from "../../../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {ExpensesCategoryService} from "../../../../../../controller/service/ExpensesCategory.service";
import {ExpensesVo} from "../../../../../../controller/model/Expenses.model";
import {ExpensesCategoryVo} from "../../../../../../controller/model/ExpensesCategory.model";
import {environment} from "../../../../../../../environments/environment";

@Component({
  selector: 'app-expenses-view-admin',
  templateUrl: './expenses-view-admin.component.html',
  styleUrls: ['./expenses-view-admin.component.scss']
})
export class ExpensesViewAdminComponent {


  constructor(private datePipe: DatePipe, private expensesService: ExpensesService
      , private roleService: RoleService
      , private messageService: MessageService
      , private router: Router
      , private expensesCategoryService: ExpensesCategoryService
  ) {
  }

// methods
  ngOnInit(): void {
    this.selectedExpensesCategory = new ExpensesCategoryVo();
    this.expensesCategoryService.findAll().subscribe((data) => this.expensesCategorys = data);
  }

  hideViewDialog() {
    this.viewExpensesDialog = false;
  }

  // getters and setters

  set expensess(value: Array<ExpensesVo>) {
    this.expensesService.expensess = value;
  }

  get expensess(): Array<ExpensesVo> {
    return this.expensesService.expensess;
  }

  get selectedExpenses(): ExpensesVo {
    return this.expensesService.selectedExpenses;
  }

  set selectedExpenses(value: ExpensesVo) {
    this.expensesService.selectedExpenses = value;
  }

  get viewExpensesDialog(): boolean {
    return this.expensesService.viewExpensesDialog;

  }

  set viewExpensesDialog(value: boolean) {
    this.expensesService.viewExpensesDialog = value;
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

  get editExpensesCategoryDialog(): boolean {
    return this.expensesCategoryService.editExpensesCategoryDialog;
  }

  set editExpensesCategoryDialog(value: boolean) {
    this.expensesCategoryService.editExpensesCategoryDialog = value;
  }

  get dateFormat() {
    return environment.dateFormatView;
  }

  get dateFormatColumn() {
    return environment.dateFormatList;
  }


}
