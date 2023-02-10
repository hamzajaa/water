import { Component } from '@angular/core';
import {DatePipe} from "@angular/common";
import {ExpensesCategoryService} from "../../../../../../controller/service/ExpensesCategory.service";
import {RoleService} from "../../../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {ExpensesCategoryVo} from "../../../../../../controller/model/ExpensesCategory.model";
import {environment} from "../../../../../../../environments/environment";

@Component({
  selector: 'app-expenses-category-view-admin',
  templateUrl: './expenses-category-view-admin.component.html',
  styleUrls: ['./expenses-category-view-admin.component.scss']
})
export class ExpensesCategoryViewAdminComponent {


  constructor(private datePipe: DatePipe, private expensesCategoryService: ExpensesCategoryService
      , private roleService: RoleService
      , private messageService: MessageService
      , private router: Router
  ) {
  }

// methods
  ngOnInit(): void {
  }

  hideViewDialog() {
    this.viewExpensesCategoryDialog = false;
  }

  // getter and setter


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

  get viewExpensesCategoryDialog(): boolean {
    return this.expensesCategoryService.viewExpensesCategoryDialog;

  }

  set viewExpensesCategoryDialog(value: boolean) {
    this.expensesCategoryService.viewExpensesCategoryDialog = value;
  }

  get dateFormat() {
    return environment.dateFormatView;
  }

  get dateFormatColumn() {
    return environment.dateFormatList;
  }

}
