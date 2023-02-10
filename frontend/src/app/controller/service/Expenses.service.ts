import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {RoleService} from "./role.service";
import {environment} from "../../../environments/environment";
import {ExpensesVo} from "../model/Expenses.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ExpensesService {

    public editExpenses$ = new BehaviorSubject<boolean>(false);
    private API = '';
    private role$: Observable<string>;

    constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl + role.toLowerCase() + '/expenses/';
        });
    }

    private _expensess: Array<ExpensesVo>;
    private _selectedExpenses: ExpensesVo;
    private _expensesSelections: Array<ExpensesVo>;
    private _createExpensesDialog: boolean;
    private _editExpensesDialog: boolean;
    private _viewExpensesDialog: boolean;
    private _searchExpenses: ExpensesVo;


    // methods

    public findAll() {
        return this.http.get<Array<ExpensesVo>>(this.API);
    }

    public save(): Observable<ExpensesVo> {
        return this.http.post<ExpensesVo>(this.API, this.selectedExpenses);
    }

    delete(expenses: ExpensesVo) {
        return this.http.delete<number>(this.API + 'id/' + expenses.id);
    }

    public edit(): Observable<ExpensesVo> {
        return this.http.put<ExpensesVo>(this.API, this.selectedExpenses);
    }

    public findByCriteria(expenses: ExpensesVo): Observable<Array<ExpensesVo>> {
        return this.http.post<Array<ExpensesVo>>(this.API + 'search', expenses);
    }

    public findByIdWithAssociatedList(expenses: ExpensesVo): Observable<ExpensesVo> {
        return this.http.get<ExpensesVo>(this.API + 'detail/id/' + expenses.id);
    }


    // getters and setters
    get expensess(): Array<ExpensesVo> {
        if (this._expensess == null) {
            this._expensess = new Array<ExpensesVo>();
        }
        return this._expensess;
    }

    set expensess(value: Array<ExpensesVo>) {
        this._expensess = value;
    }

    get selectedExpenses(): ExpensesVo {
        if (this._selectedExpenses == null) {
            this._selectedExpenses = new ExpensesVo();
        }
        return this._selectedExpenses;
    }

    set selectedExpenses(value: ExpensesVo) {
        this._selectedExpenses = value;
    }

    get expensesSelections(): Array<ExpensesVo> {
        if (this._expensesSelections == null) {
            this._expensesSelections = new Array<ExpensesVo>();
        }
        return this._expensesSelections;
    }

    set expensesSelections(value: Array<ExpensesVo>) {
        this._expensesSelections = value;
    }

    get createExpensesDialog(): boolean {
        return this._createExpensesDialog;
    }

    set createExpensesDialog(value: boolean) {
        this._createExpensesDialog = value;
    }


    get editExpensesDialog(): boolean {
        return this._editExpensesDialog;
    }

    set editExpensesDialog(value: boolean) {
        this._editExpensesDialog = value;
    }

    get viewExpensesDialog(): boolean {
        return this._viewExpensesDialog;
    }

    set viewExpensesDialog(value: boolean) {
        this._viewExpensesDialog = value;
    }

    get searchExpenses(): ExpensesVo {
        if (this._searchExpenses == null) {
            this._searchExpenses = new ExpensesVo();
        }
        return this._searchExpenses;
    }

    set searchExpenses(value: ExpensesVo) {
        this._searchExpenses = value;
    }

}