import {Component} from '@angular/core';
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {ExpensesCategoryVo} from "../../../../../../controller/model/ExpensesCategory.model";
import {DatePipe} from "@angular/common";
import {ExpensesService} from "../../../../../../controller/service/Expenses.service";
import {RoleService} from "../../../../../../controller/service/role.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../../../controller/service/Auth.service";
import {ExportService} from "../../../../../../controller/service/Export.service";
import {ExpensesCategoryService} from "../../../../../../controller/service/ExpensesCategory.service";
import {ExpensesVo} from "../../../../../../controller/model/Expenses.model";
import {environment} from "../../../../../../../environments/environment";

@Component({
    selector: 'app-expenses-list-admin',
    templateUrl: './expenses-list-admin.component.html',
    styleUrls: ['./expenses-list-admin.component.scss']
})
export class ExpensesListAdminComponent {

    // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Expenses';
    expensesCategorys: Array<ExpensesCategoryVo>;
    items: MenuItem[];

    home: MenuItem;

    constructor(private datePipe: DatePipe, private expensesService: ExpensesService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
        , private expensesCategoryService: ExpensesCategoryService
    ) {
    }

    // methods
    ngOnInit(): void {
        this.loadExpensess();
        this.initExport();
        this.initCol();
        this.loadExpensesCategory();

        this.items = [
            {label: 'Expenses', routerLink: '/app/admin/waterBilling/Expenses/list'},

        ];

        this.home = {icon: 'pi pi-home', routerLink: '/'};
    }

    public async loadExpensess() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Expenses', 'list');
        isPermistted ? this.expensesService.findAll().subscribe(expensess => this.expensess = expensess, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'error', detail: 'permission problem'});
    }

    public searchRequest() {
        this.expensesService.findByCriteria(this.searchExpenses).subscribe(expensess => {

            this.expensess = expensess;
            // this.searchExpenses = new ExpensesVo();
        }, error => console.log(error));
    }

    public async editExpenses(expenses: ExpensesVo) {
        const isPermistted = await this.roleService.isPermitted('Expenses', 'edit');
        if (isPermistted) {
            this.expensesService.findByIdWithAssociatedList(expenses).subscribe(res => {
                this.selectedExpenses = res;
                this.selectedExpenses.dateExpense = new Date(expenses.dateExpense);

                this.editExpensesDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Errors', detail: 'permission problem'
            });
        }

    }

    public async viewExpenses(expenses: ExpensesVo) {
        const isPermistted = await this.roleService.isPermitted('Expenses', 'view');
        if (isPermistted) {
            this.expensesService.findByIdWithAssociatedList(expenses).subscribe(res => {
                this.selectedExpenses = res;
                this.selectedExpenses.dateExpense = new Date(expenses.dateExpense);
                this.viewExpensesDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'error', detail: 'permission problem'
            });
        }

    }

    public async openCreateExpenses(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedExpenses = new ExpensesVo();
            this.createExpensesDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'error', detail: 'permission problem'
            });
        }

    }

    public async deleteExpenses(expenses: ExpensesVo) {
        const isPermistted = await this.roleService.isPermitted('Expenses', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Do you want to delete this item (Expenses) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.expensesService.delete(expenses).subscribe(status => {
                        if (status > 0) {
                            const position = this.expensess.indexOf(expenses);
                            position > -1 ? this.expensess.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'Expenses Deleted',
                                life: 3000
                            });
                        }

                    }, error => console.log(error))
                }
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'error', detail: 'permission problem'
            });
        }
    }

    public async loadExpensesCategory() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Expenses', 'list');
        isPermistted ? this.expensesCategoryService.findAll().subscribe(expensesCategorys => this.expensesCategorys = expensesCategorys, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Errors', detail: 'permission problem'});

    }

    public async duplicateExpenses(expenses: ExpensesVo) {

        this.expensesService.findByIdWithAssociatedList(expenses).subscribe(
            res => {
                this.initDuplicateExpenses(res);
                this.selectedExpenses = res;
                this.selectedExpenses.id = null;


                this.createExpensesDialog = true;

            });

    }

    initDuplicateExpenses(res: ExpensesVo) {


    }

    initExport(): void {
        this.excelPdfButons = [
            {
                label: 'CSV', icon: 'pi pi-file', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exporterCSV(this.criteriaData, this.exportData, this.fileName);
                }
            },
            {
                label: 'XLS', icon: 'pi pi-file-excel', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exporterExcel(this.criteriaData, this.exportData, this.fileName);
                }
            },
            {
                label: 'PDF', icon: 'pi pi-file-pdf', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exporterPdf(this.criteriaData, this.exportData, this.fileName);
                }
            }
        ];
    }

    prepareColumnExport(): void {
        this.exportData = this.expensess.map(e => {
            return {
                'Title': e.title,
                'Amount': e.amount,
                'ExpensesCategory': e.expensesCategoryVo?.name,
                'Date Expense': this.datePipe.transform(e.dateExpense, 'dd/MM/yyyy hh:mm'),
            }
        });

        this.criteriaData = [{
            'Title': this.searchExpenses.title ? this.searchExpenses.title : environment.emptyForExport,
            'Amount': this.searchExpenses.amount ? this.searchExpenses.amount : environment.emptyForExport,
            'ExpensesCategory': this.searchExpenses.expensesCategoryVo?.name ? this.searchExpenses.expensesCategoryVo?.name : environment.emptyForExport,
            'Date Expense Min': this.searchExpenses.dateExpenseMin ? this.datePipe.transform(this.searchExpenses.dateExpenseMin, this.dateFormat) : environment.emptyForExport,
            'Date Expense Max': this.searchExpenses.dateExpenseMax ? this.datePipe.transform(this.searchExpenses.dateExpenseMax, this.dateFormat) : environment.emptyForExport
        }];

    }

    private initCol() {
        this.cols = [
            {field: 'title', header: 'Title'},
            {field: 'amount', header: 'Amount'},
            {field: 'expensesCategory?.name', header: 'ExpensesCategory'},
            {field: 'dateExpense', header: 'Date Expense'},
        ];
    }

// getter and setter
    get expensess(): Array<ExpensesVo> {
        return this.expensesService.expensess;
    }

    set expensess(value: Array<ExpensesVo>) {
        this.expensesService.expensess = value;
    }

    get expensesSelections(): Array<ExpensesVo> {
        return this.expensesService.expensesSelections;
    }

    set expensesSelections(value: Array<ExpensesVo>) {
        this.expensesService.expensesSelections = value;
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

    get editExpensesDialog(): boolean {
        return this.expensesService.editExpensesDialog;
    }

    set editExpensesDialog(value: boolean) {
        this.expensesService.editExpensesDialog = value;
    }

    get viewExpensesDialog(): boolean {
        return this.expensesService.viewExpensesDialog;
    }

    set viewExpensesDialog(value: boolean) {
        this.expensesService.viewExpensesDialog = value;
    }

    get searchExpenses(): ExpensesVo {
        return this.expensesService.searchExpenses;
    }

    set searchExpenses(value: ExpensesVo) {
        this.expensesService.searchExpenses = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }

}
