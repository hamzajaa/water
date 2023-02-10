import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {RoleService} from "./role.service";
import {environment} from "../../../environments/environment";
import {ExpensesCategoryVo} from "../model/ExpensesCategory.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ExpensesCategoryService {

    public editExpensesCategory$ = new BehaviorSubject<boolean>(false);
    private API = '';
    private role$: Observable<string>;

    constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl + role.toLowerCase() + '/expensesCategory/';
        });
    }

    private _expensesCategorys: Array<ExpensesCategoryVo>;
    private _selectedExpensesCategory: ExpensesCategoryVo;
    private _expensesCategorySelections: Array<ExpensesCategoryVo>;
    private _createExpensesCategoryDialog: boolean;
    private _editExpensesCategoryDialog: boolean;
    private _viewExpensesCategoryDialog: boolean;
    private _searchExpensesCategory: ExpensesCategoryVo;


    // methods

    public findAll() {
        return this.http.get<Array<ExpensesCategoryVo>>(this.API);
    }

    public save(): Observable<ExpensesCategoryVo> {
        return this.http.post<ExpensesCategoryVo>(this.API, this.selectedExpensesCategory);
    }

    delete(expensesCategory: ExpensesCategoryVo) {
        return this.http.delete<number>(this.API + 'id/' + expensesCategory.id);
    }

    public edit(): Observable<ExpensesCategoryVo> {
        return this.http.put<ExpensesCategoryVo>(this.API, this.selectedExpensesCategory);
    }

    public findByCriteria(expensesCategory: ExpensesCategoryVo): Observable<Array<ExpensesCategoryVo>> {
        return this.http.post<Array<ExpensesCategoryVo>>(this.API + 'search', expensesCategory);
    }

    public findByIdWithAssociatedList(expensesCategory: ExpensesCategoryVo): Observable<ExpensesCategoryVo> {
        return this.http.get<ExpensesCategoryVo>(this.API + 'detail/id/' + expensesCategory.id);
    }


    // getters and setters
    get expensesCategorys(): Array<ExpensesCategoryVo> {
        if (this._expensesCategorys == null) {
            this._expensesCategorys = new Array<ExpensesCategoryVo>();
        }
        return this._expensesCategorys;
    }

    set expensesCategorys(value: Array<ExpensesCategoryVo>) {
        this._expensesCategorys = value;
    }

    get selectedExpensesCategory(): ExpensesCategoryVo {
        if (this._selectedExpensesCategory == null) {
            this._selectedExpensesCategory = new ExpensesCategoryVo();
        }
        return this._selectedExpensesCategory;
    }

    set selectedExpensesCategory(value: ExpensesCategoryVo) {
        this._selectedExpensesCategory = value;
    }

    get expensesCategorySelections(): Array<ExpensesCategoryVo> {
        if (this._expensesCategorySelections == null) {
            this._expensesCategorySelections = new Array<ExpensesCategoryVo>();
        }
        return this._expensesCategorySelections;
    }

    set expensesCategorySelections(value: Array<ExpensesCategoryVo>) {
        this._expensesCategorySelections = value;
    }

    get createExpensesCategoryDialog(): boolean {
        return this._createExpensesCategoryDialog;
    }

    set createExpensesCategoryDialog(value: boolean) {
        this._createExpensesCategoryDialog = value;
    }


    get editExpensesCategoryDialog(): boolean {
        return this._editExpensesCategoryDialog;
    }

    set editExpensesCategoryDialog(value: boolean) {
        this._editExpensesCategoryDialog = value;
    }

    get viewExpensesCategoryDialog(): boolean {
        return this._viewExpensesCategoryDialog;
    }

    set viewExpensesCategoryDialog(value: boolean) {
        this._viewExpensesCategoryDialog = value;
    }

    get searchExpensesCategory(): ExpensesCategoryVo {
        if (this._searchExpensesCategory == null) {
            this._searchExpensesCategory = new ExpensesCategoryVo();
        }
        return this._searchExpensesCategory;
    }

    set searchExpensesCategory(value: ExpensesCategoryVo) {
        this._searchExpensesCategory = value;
    }

}