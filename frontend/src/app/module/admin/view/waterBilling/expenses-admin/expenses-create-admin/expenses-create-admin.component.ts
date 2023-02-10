import {Component} from '@angular/core';
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
    selector: 'app-expenses-create-admin',
    templateUrl: './expenses-create-admin.component.html',
    styleUrls: ['./expenses-create-admin.component.scss']
})
export class ExpensesCreateAdminComponent {


    constructor(private datePipe: DatePipe, private expensesService: ExpensesService
        , private stringUtilService: StringUtilService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
        , private expensesCategoryService: ExpensesCategoryService
    ) {

    }

    _submitted = false;
    _validExpensesExpensesCategory = true;
    _validExpensesTitle = true;
    _validExpensesAmount = true;
    _validExpensesDateExpense = true;

    private _errorMessages = new Array<string>();

    // methods
    ngOnInit(): void {

        this.selectedExpensesExpensesCategory = new ExpensesCategoryVo();
        this.expensesCategoryService.findAll().subscribe((data) => this.expensesCategorys = data);
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
        this.expensesService.save().subscribe(expenses => {
            if (expenses != null) {
                this.expensess.push({...expenses});
                this.createExpensesDialog = false;
                this.submitted = false;
                this.selectedExpenses = new ExpensesVo();

            } else {
                this.messageService.add({severity: 'error', summary: 'Errors', detail: 'Expenses already exist'});
            }

        }, error => {
            console.log(error);
        });
    }

    public async openCreateExpensesCategory(expensesCategory: string) {
        const isPermistted = await this.roleService.isPermitted('ExpensesCategory', 'add');
        if (isPermistted) {
            this.selectedExpensesExpensesCategory = new ExpensesCategoryVo();
            this.createExpensesExpensesCategoryDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'error', detail: 'permission problem'
            });
        }
    }

    hideCreateDialog() {
        this.createExpensesDialog = false;
        this.setValidation(true);
    }

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

    set submitted(value: boolean) {
        this._submitted = value;
    }

    get submitted(): boolean {
        return this._submitted;
    }

    get errorMessages(): string[] {
        return this._errorMessages;
    }

    set errorMessages(value: string[]) {
        this._errorMessages = value;
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

    get createExpensesDialog(): boolean {
        return this.expensesService.createExpensesDialog;

    }

    set createExpensesDialog(value: boolean) {
        this.expensesService.createExpensesDialog = value;
    }

    get selectedExpensesExpensesCategory(): ExpensesCategoryVo {
        return this.expensesCategoryService.selectedExpensesCategory;
    }

    set selectedExpensesExpensesCategory(value: ExpensesCategoryVo) {
        this.expensesCategoryService.selectedExpensesCategory = value;
    }

    get expensesCategorys(): Array<ExpensesCategoryVo> {
        return this.expensesCategoryService.expensesCategorys;
    }

    set expensesCategorys(value: Array<ExpensesCategoryVo>) {
        this.expensesCategoryService.expensesCategorys = value;
    }

    get createExpensesExpensesCategoryDialog(): boolean {
        return this.expensesCategoryService.createExpensesCategoryDialog;
    }

    set createExpensesExpensesCategoryDialog(value: boolean) {
        this.expensesCategoryService.createExpensesCategoryDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatCreate;
    }

    get dateFormatColumn() {
        return environment.dateFormatCreate;
    }

    set validExpensesExpensesCategory(value: boolean) {
        this._validExpensesExpensesCategory = value;
    }

    get validExpensesExpensesCategory(): boolean {
        return this._validExpensesExpensesCategory;
    }

    set validExpensesTitle(value: boolean) {
        this._validExpensesTitle = value;
    }

    get validExpensesTitle(): boolean {
        return this._validExpensesTitle;
    }

    set validExpensesAmount(value: boolean) {
        this._validExpensesAmount = value;
    }

    get validExpensesAmount(): boolean {
        return this._validExpensesAmount;
    }

    set validExpensesDateExpense(value: boolean) {
        this._validExpensesDateExpense = value;
    }

    get validExpensesDateExpense(): boolean {
        return this._validExpensesDateExpense;
    }


}
