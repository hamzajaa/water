import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {RoleService} from "./role.service";
import {environment} from "../../../environments/environment";
import {PaymentCategoryVo} from "../model/PaymentCategory.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class PaymentCategoryService {

    public editPaymentCategory$ = new BehaviorSubject<boolean>(false);
    private API = '';
    private role$: Observable<string>;

    constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl + role.toLowerCase() + '/paymentCategory/';
        });
    }

    private _paymentCategorys: Array<PaymentCategoryVo>;
    private _selectedPaymentCategory: PaymentCategoryVo;
    private _paymentCategorySelections: Array<PaymentCategoryVo>;
    private _createPaymentCategoryDialog: boolean;
    private _editPaymentCategoryDialog: boolean;
    private _viewPaymentCategoryDialog: boolean;
    private _searchPaymentCategory: PaymentCategoryVo;


    // methods

    public findAll() {
        return this.http.get<Array<PaymentCategoryVo>>(this.API);
    }

    public save(): Observable<PaymentCategoryVo> {
        return this.http.post<PaymentCategoryVo>(this.API, this.selectedPaymentCategory);
    }

    delete(paymentCategory: PaymentCategoryVo) {
        return this.http.delete<number>(this.API + 'id/' + paymentCategory.id);
    }

    public edit(): Observable<PaymentCategoryVo> {
        return this.http.put<PaymentCategoryVo>(this.API, this.selectedPaymentCategory);
    }

    public findByCriteria(paymentCategory: PaymentCategoryVo): Observable<Array<PaymentCategoryVo>> {
        return this.http.post<Array<PaymentCategoryVo>>(this.API + 'search', paymentCategory);
    }

    public findByIdWithAssociatedList(paymentCategory: PaymentCategoryVo): Observable<PaymentCategoryVo> {
        return this.http.get<PaymentCategoryVo>(this.API + 'detail/id/' + paymentCategory.id);
    }


    // getters and setters
    get paymentCategorys(): Array<PaymentCategoryVo> {
        if (this._paymentCategorys == null) {
            this._paymentCategorys = new Array<PaymentCategoryVo>();
        }
        return this._paymentCategorys;
    }

    set paymentCategorys(value: Array<PaymentCategoryVo>) {
        this._paymentCategorys = value;
    }

    get selectedPaymentCategory(): PaymentCategoryVo {
        if (this._selectedPaymentCategory == null) {
            this._selectedPaymentCategory = new PaymentCategoryVo();
        }
        return this._selectedPaymentCategory;
    }

    set selectedPaymentCategory(value: PaymentCategoryVo) {
        this._selectedPaymentCategory = value;
    }

    get paymentCategorySelections(): Array<PaymentCategoryVo> {
        if (this._paymentCategorySelections == null) {
            this._paymentCategorySelections = new Array<PaymentCategoryVo>();
        }
        return this._paymentCategorySelections;
    }

    set paymentCategorySelections(value: Array<PaymentCategoryVo>) {
        this._paymentCategorySelections = value;
    }

    get createPaymentCategoryDialog(): boolean {
        return this._createPaymentCategoryDialog;
    }

    set createPaymentCategoryDialog(value: boolean) {
        this._createPaymentCategoryDialog = value;
    }


    get editPaymentCategoryDialog(): boolean {
        return this._editPaymentCategoryDialog;
    }

    set editPaymentCategoryDialog(value: boolean) {
        this._editPaymentCategoryDialog = value;
    }

    get viewPaymentCategoryDialog(): boolean {
        return this._viewPaymentCategoryDialog;
    }

    set viewPaymentCategoryDialog(value: boolean) {
        this._viewPaymentCategoryDialog = value;
    }

    get searchPaymentCategory(): PaymentCategoryVo {
        if (this._searchPaymentCategory == null) {
            this._searchPaymentCategory = new PaymentCategoryVo();
        }
        return this._searchPaymentCategory;
    }

    set searchPaymentCategory(value: PaymentCategoryVo) {
        this._searchPaymentCategory = value;
    }

}