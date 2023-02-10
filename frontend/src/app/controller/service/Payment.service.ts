import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {RoleService} from "./role.service";
import {environment} from "../../../environments/environment";
import {PaymentVo} from "../model/Payment.model";
import {HttpClient, HttpEventType, HttpRequest, HttpResponse} from "@angular/common/http";
import {error} from "protractor";

@Injectable({
    providedIn: 'root'
})
export class PaymentService {

    public editPayment$ = new BehaviorSubject<boolean>(false);
    private API = '';
    private role$: Observable<string>;

    constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl + role.toLowerCase() + '/payment/';
        });
    }

    private _payments: Array<PaymentVo>;
    private _selectedPayment: PaymentVo;
    private _paymentSelections: Array<PaymentVo>;
    private _createPaymentDialog: boolean;
    private _editPaymentDialog: boolean;
    private _viewPaymentDialog: boolean;
    private _searchPayment: PaymentVo;


    // methods

    public findAll() {
        return this.http.get<Array<PaymentVo>>(this.API);
    }

    public save(): Observable<PaymentVo> {
        return this.http.post<PaymentVo>(this.API, this.selectedPayment);
    }

    delete(payment: PaymentVo) {
        return this.http.delete<number>(this.API + 'id/' + payment.id);
    }

    public edit(): Observable<PaymentVo> {
        return this.http.put<PaymentVo>(this.API, this.selectedPayment);
    }

    public findByCriteria(payment: PaymentVo): Observable<Array<PaymentVo>> {
        return this.http.post<Array<PaymentVo>>(this.API + 'search', payment);
    }

    public findByIdWithAssociatedList(payment: PaymentVo): Observable<PaymentVo> {
        return this.http.get<PaymentVo>(this.API + 'detail/id/' + payment.id);
    }

    showSpinner = false;

    public importDataAll(formData: FormData):Observable<any> {
       //
       //  this.showSpinner = true;
       //  const uploadReq = new HttpRequest('POST', 'http://localhost:8036/api/excel/upload', formData, {
       //      reportProgress: true,
       //  });
       // this.http.request(uploadReq).subscribe(
       //      {
       //          next: (event) => {
       //              if (event.type === HttpEventType.UploadProgress) {
       //                  console.log(`Upload progress: ${Math.round(100 * event.loaded / event.total)}%`);
       //              } else if (event instanceof HttpResponse) {
       //                  console.log('File is completely uploaded!');
       //              }
       //              this.showSpinner = false;
       //
       //          },
       //          error: () => {
       //              this.showSpinner = false;
       //          }
       //      }
       //  );
       return this.http.post('http://localhost:8036/api/excel/upload',formData);
    }

    // getters and setters
    get payments(): Array<PaymentVo> {
        if (this._payments == null) {
            this._payments = new Array<PaymentVo>();
        }
        return this._payments;
    }

    set payments(value: Array<PaymentVo>) {
        this._payments = value;
    }

    get selectedPayment(): PaymentVo {
        if (this._selectedPayment == null) {
            this._selectedPayment = new PaymentVo();
        }
        return this._selectedPayment;
    }

    set selectedPayment(value: PaymentVo) {
        this._selectedPayment = value;
    }

    get paymentSelections(): Array<PaymentVo> {
        if (this._paymentSelections == null) {
            this._paymentSelections = new Array<PaymentVo>();
        }
        return this._paymentSelections;
    }

    set paymentSelections(value: Array<PaymentVo>) {
        this._paymentSelections = value;
    }

    get createPaymentDialog(): boolean {
        return this._createPaymentDialog;
    }

    set createPaymentDialog(value: boolean) {
        this._createPaymentDialog = value;
    }


    get editPaymentDialog(): boolean {
        return this._editPaymentDialog;
    }

    set editPaymentDialog(value: boolean) {
        this._editPaymentDialog = value;
    }

    get viewPaymentDialog(): boolean {
        return this._viewPaymentDialog;
    }

    set viewPaymentDialog(value: boolean) {
        this._viewPaymentDialog = value;
    }

    get searchPayment(): PaymentVo {
        if (this._searchPayment == null) {
            this._searchPayment = new PaymentVo();
        }
        return this._searchPayment;
    }

    set searchPayment(value: PaymentVo) {
        this._searchPayment = value;
    }

}