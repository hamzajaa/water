import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {RoleService} from "./role.service";
import {environment} from "../../../environments/environment";
import {PaymentStatusVo} from "../model/PaymentStatus.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class PaymentStatusService {

    public editPaymentStatus$ = new BehaviorSubject<boolean>(false);
    private API = '';
    private role$: Observable<string>;

    constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl + role.toLowerCase() + '/paymentStatus/';
        });
    }

    private _paymentStatuss: Array<PaymentStatusVo>;
    private _selectedPaymentStatus: PaymentStatusVo;
    private _paymentStatusSelections: Array<PaymentStatusVo>;
    private _createPaymentStatusDialog: boolean;
    private _editPaymentStatusDialog: boolean;
    private _viewPaymentStatusDialog: boolean;
    private _searchPaymentStatus: PaymentStatusVo;


    // methods

    public findAll() {
        return this.http.get<Array<PaymentStatusVo>>(this.API);
    }

    public save(): Observable<PaymentStatusVo> {
        return this.http.post<PaymentStatusVo>(this.API, this.selectedPaymentStatus);
    }

    delete(paymentStatus: PaymentStatusVo) {
        return this.http.delete<number>(this.API + 'id/' + paymentStatus.id);
    }

    public edit(): Observable<PaymentStatusVo> {
        return this.http.put<PaymentStatusVo>(this.API, this.selectedPaymentStatus);
    }

    public findByCriteria(paymentStatus: PaymentStatusVo): Observable<Array<PaymentStatusVo>> {
        return this.http.post<Array<PaymentStatusVo>>(this.API + 'search', paymentStatus);
    }

    public findByIdWithAssociatedList(paymentStatus: PaymentStatusVo): Observable<PaymentStatusVo> {
        return this.http.get<PaymentStatusVo>(this.API + 'detail/id/' + paymentStatus.id);
    }


    // getters and setters
    get paymentStatuss(): Array<PaymentStatusVo> {
        if (this._paymentStatuss == null) {
            this._paymentStatuss = new Array<PaymentStatusVo>();
        }
        return this._paymentStatuss;
    }

    set paymentStatuss(value: Array<PaymentStatusVo>) {
        this._paymentStatuss = value;
    }

    get selectedPaymentStatus(): PaymentStatusVo {
        if (this._selectedPaymentStatus == null) {
            this._selectedPaymentStatus = new PaymentStatusVo();
        }
        return this._selectedPaymentStatus;
    }

    set selectedPaymentStatus(value: PaymentStatusVo) {
        this._selectedPaymentStatus = value;
    }

    get paymentStatusSelections(): Array<PaymentStatusVo> {
        if (this._paymentStatusSelections == null) {
            this._paymentStatusSelections = new Array<PaymentStatusVo>();
        }
        return this._paymentStatusSelections;
    }

    set paymentStatusSelections(value: Array<PaymentStatusVo>) {
        this._paymentStatusSelections = value;
    }

    get createPaymentStatusDialog(): boolean {
        return this._createPaymentStatusDialog;
    }

    set createPaymentStatusDialog(value: boolean) {
        this._createPaymentStatusDialog = value;
    }


    get editPaymentStatusDialog(): boolean {
        return this._editPaymentStatusDialog;
    }

    set editPaymentStatusDialog(value: boolean) {
        this._editPaymentStatusDialog = value;
    }

    get viewPaymentStatusDialog(): boolean {
        return this._viewPaymentStatusDialog;
    }

    set viewPaymentStatusDialog(value: boolean) {
        this._viewPaymentStatusDialog = value;
    }

    get searchPaymentStatus(): PaymentStatusVo {
        if (this._searchPaymentStatus == null) {
            this._searchPaymentStatus = new PaymentStatusVo();
        }
        return this._searchPaymentStatus;
    }

    set searchPaymentStatus(value: PaymentStatusVo) {
        this._searchPaymentStatus = value;
    }

}