import {Component} from '@angular/core';
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {DatePipe} from "@angular/common";
import {ExpensesCategoryService} from "../../../../../../controller/service/ExpensesCategory.service";
import {RoleService} from "../../../../../../controller/service/role.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../../../controller/service/Auth.service";
import {ExportService} from "../../../../../../controller/service/Export.service";
import {ExpensesCategoryVo} from "../../../../../../controller/model/ExpensesCategory.model";
import {environment} from "../../../../../../../environments/environment";

@Component({
    selector: 'app-expenses-category-list-admin',
    templateUrl: './expenses-category-list-admin.component.html',
    styleUrls: ['./expenses-category-list-admin.component.scss']
})
export class ExpensesCategoryListAdminComponent {


    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ExpensesCategory';

    items: MenuItem[];

    home: MenuItem;

    constructor(private datePipe: DatePipe, private expensesCategorysService: ExpensesCategoryService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
    ) {
    }

    ngOnInit(): void {
        this.items = [
            {label: 'Expenses Categories', routerLink: '/app/admin/waterBilling/expenses-category/list'},

        ];
        this.home = {icon: 'pi pi-home', routerLink: '/'};

        this.loadExpensesCategorys();
        this.initExport();
        this.initCol();
    }

    // methods
    public async loadExpensesCategorys() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ExpensesCategory', 'list');
        isPermistted ? this.expensesCategorysService.findAll().subscribe(expensesCategorys => this.expensesCategorys = expensesCategorys, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'error', detail: 'permission problem'});
    }

    public searchRequest() {
        this.expensesCategorysService.findByCriteria(this.searchExpensesCategory).subscribe(expensesCategorys => {

            this.expensesCategorys = expensesCategorys;
            // this.searchExpensesCategory = new ExpensesCategoryVo();
        }, error => console.log(error));
    }

    public async editExpensesCategory(expensesCategorys: ExpensesCategoryVo) {
        const isPermistted = await this.roleService.isPermitted('ExpensesCategory', 'edit');
        if (isPermistted) {
            this.expensesCategorysService.findByIdWithAssociatedList(expensesCategorys).subscribe(res => {
                this.selectedExpensesCategory = res;
                this.editExpensesCategoryDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Errors', detail: 'permission problem'
            });
        }

    }

    public async viewExpensesCategory(expensesCategorys: ExpensesCategoryVo) {
        const isPermistted = await this.roleService.isPermitted('ExpensesCategory', 'view');
        if (isPermistted) {
            this.expensesCategorysService.findByIdWithAssociatedList(expensesCategorys).subscribe(res => {
                this.selectedExpensesCategory = res;
                this.viewExpensesCategoryDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'error', detail: 'permission problem'
            });
        }

    }

    public async openCreateExpensesCategory(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedExpensesCategory = new ExpensesCategoryVo();
            this.createExpensesCategoryDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'error', detail: 'permission problem'
            });
        }

    }

    public async deleteExpensesCategory(expensesCategorys: ExpensesCategoryVo) {
        const isPermistted = await this.roleService.isPermitted('ExpensesCategory', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Do you want to delete this item (ExpensesCategory) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.expensesCategorysService.delete(expensesCategorys).subscribe(status => {
                        if (status > 0) {
                            const position = this.expensesCategorys.indexOf(expensesCategorys);
                            position > -1 ? this.expensesCategorys.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'ExpensesCategory Deleted',
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

    public async duplicateExpensesCategory(expensesCategorys: ExpensesCategoryVo) {

        this.expensesCategorysService.findByIdWithAssociatedList(expensesCategorys).subscribe(
            res => {
                this.initDuplicateExpensesCategory(res);
                this.selectedExpensesCategory = res;
                this.selectedExpensesCategory.id = null;


                this.createExpensesCategoryDialog = true;

            });

    }

    initDuplicateExpensesCategory(res: ExpensesCategoryVo) {


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
        this.exportData = this.expensesCategorys.map(e => {
            return {
                'Name': e.name,
            }
        });

        this.criteriaData = [{
            'Name': this.searchExpensesCategory.name ? this.searchExpensesCategory.name : environment.emptyForExport,
        }];

    }

    private initCol() {
        this.cols = [
            {field: 'name', header: 'Name'},
        ];
    }


    get expensesCategorys(): Array<ExpensesCategoryVo> {
        return this.expensesCategorysService.expensesCategorys;
    }

    set expensesCategorys(value: Array<ExpensesCategoryVo>) {
        this.expensesCategorysService.expensesCategorys = value;
    }

    get expensesCategorySelections(): Array<ExpensesCategoryVo> {
        return this.expensesCategorysService.expensesCategorySelections;
    }

    set expensesCategorySelections(value: Array<ExpensesCategoryVo>) {
        this.expensesCategorysService.expensesCategorySelections = value;
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

    get editExpensesCategoryDialog(): boolean {
        return this.expensesCategorysService.editExpensesCategoryDialog;
    }

    set editExpensesCategoryDialog(value: boolean) {
        this.expensesCategorysService.editExpensesCategoryDialog = value;
    }

    get viewExpensesCategoryDialog(): boolean {
        return this.expensesCategorysService.viewExpensesCategoryDialog;
    }

    set viewExpensesCategoryDialog(value: boolean) {
        this.expensesCategorysService.viewExpensesCategoryDialog = value;
    }

    get searchExpensesCategory(): ExpensesCategoryVo {
        return this.expensesCategorysService.searchExpensesCategory;
    }

    set searchExpensesCategory(value: ExpensesCategoryVo) {
        this.expensesCategorysService.searchExpensesCategory = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }
}
