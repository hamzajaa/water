import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RoleService} from "./role.service";
import {environment} from "../../../environments/environment";
import {ClientVo} from "../model/Client.model";
import * as moment from "moment/moment";
import {BigDecimal} from "bigdecimal.js";


@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    public editDashboard$ = new BehaviorSubject<boolean>(false);
    private API = '';
    private role$: Observable<string>;

    private _dataStatisticsRevenues: BigDecimal[];
    private _dataStatisticsExpenses: BigDecimal[];
    private _dataStatisticsClients: number[];

    constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl + role.toLowerCase() + '/dashboard/';
        });
    }

    public clientsCount(): Observable<number> {
        return this.http.get<number>(this.API + 'clients');
    }

    public expensesCount(): Observable<number> {
        return this.http.get<number>(this.API + 'expenses');
    }

    public paymentCount(): Observable<number> {
        return this.http.get<number>(this.API + 'payments');
    }

    public monthlyPayment(): Observable<number> {
        return this.http.get<number>(this.API + 'monthly-payment');
    }


    public dataStatisticsRevenue(): Observable<BigDecimal[]> {
        return this.http.get<BigDecimal[]>(this.API + 'data-statistics-revenues');
    }
    public dataStatisticsExpenses(): Observable<BigDecimal[]> {
        return this.http.get<BigDecimal[]>(this.API + 'data-statistics-expenses');
    }

    public dataStatisticsClient(): Observable<number[]> {
        return this.http.get<number[]>(this.API + 'data-statistics-clients');
    }

    get dataStatisticsRevenues(): BigDecimal[] {
        return this._dataStatisticsRevenues;
    }

    set dataStatisticsRevenues(value: BigDecimal[]) {
        this._dataStatisticsRevenues = value;
    }


    get dataStatisticsExpensess(): BigDecimal[] {
        return this._dataStatisticsExpenses;
    }

    set dataStatisticsExpensess(value: BigDecimal[]) {
        this._dataStatisticsExpenses = value;
    }


    get dataStatisticsClients(): number[] {
        return this._dataStatisticsClients;
    }

    set dataStatisticsClients(value: number[]) {
        this._dataStatisticsClients = value;
    }
}