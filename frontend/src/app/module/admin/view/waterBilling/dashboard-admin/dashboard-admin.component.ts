import {Component, OnChanges, OnInit} from '@angular/core';
import {DashboardService} from "../../../../../controller/service/Dashboard.service";
import {RoleService} from "../../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {BigDecimal} from "bigdecimal.js";
import {HttpClient} from "@angular/common/http";
import {forkJoin} from "rxjs";

@Component({
    selector: 'app-dashboard-admin',
    templateUrl: './dashboard-admin.component.html',
    styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {

    chartData: any;
    chartOptions: any;

    private _clientNumber: number;
    private _expensesNumber: number;
    private _paymentsNumber: number;
    private _monthlyPaymentNumber: number;
    private dataStatisticsRevenueNet = [];

    constructor(private http: HttpClient, private dashboardService: DashboardService, private roleService: RoleService, private messageService: MessageService) {
        // this._dataStatisticsRevenue = [];
    }

    ngOnInit() {

        this.loadPayments();
        this.loadClients();
        this.loadExpenses();
        this.loadDataStatisticsRevenue();
        this.loadDataStatisticsExpenses();
        this.loadDataStatisticsClient();

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September ', 'October ', 'November', 'December '],
            datasets: [
                {
                    label: 'Revenue',
                    data: this.dataStatisticsRevenues,
                    backgroundColor: [
                        'rgba(187,222,251,0.2)',
                    ],
                    borderColor: [
                        '#578697',
                    ],
                    borderWidth: 3,
                    fill: true
                },
                {
                    label: 'Expenses',
                    data: this.dataStatisticsExpensess,
                    borderColor: [
                        '#1BA7AF',
                    ],
                    borderWidth: 3,
                    fill: false,
                    pointRadius: [4, 6, 4, 12, 8, 0, 4]
                },
                {
                    label: 'New Clients',
                    data: this.dataStatisticsClients,
                    borderColor: [
                        '#E2841A',
                    ],
                    borderWidth: 3,
                    fill: false
                }]
        };

        this.chartOptions = {
            responsive: true,
            hover: {
                mode: 'index'
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            }
        };


    }

    public async loadPayments() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Payment', '');
        isPermistted ? this.dashboardService.paymentCount().subscribe(number => this._paymentsNumber = number) && this.dashboardService.monthlyPayment().subscribe(number => this._monthlyPaymentNumber = number, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'error', detail: 'permission problem'});
    }

    public async loadExpenses() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Expenses', '');
        isPermistted ? this.dashboardService.expensesCount().subscribe(number => this._expensesNumber = number, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'error', detail: 'permission problem'});
    }

    public async loadClients() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Client', '');
        isPermistted ? this.dashboardService.clientsCount().subscribe(number => this._clientNumber = number, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'error', detail: 'permission problem'});
    }

    public async loadDataStatisticsRevenue() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Payment', '');
        isPermistted ? this.dashboardService.dataStatisticsRevenue().subscribe(dataStatisticsRevenue =>
                this.dataStatisticsRevenues = dataStatisticsRevenue, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'error', detail: 'permission problem'});
    }

    public async loadDataStatisticsExpenses() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Expenses', '');
        isPermistted ? this.dashboardService.dataStatisticsExpenses().subscribe(dataStatisticsExpenses =>
                this.dataStatisticsExpensess = dataStatisticsExpenses, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'error', detail: 'permission problem'});
    }

    public async loadDataStatisticsClient() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Client', '');
        isPermistted ? this.dashboardService.dataStatisticsClient().subscribe(dataStatisticsClient =>
                this.dataStatisticsClients = dataStatisticsClient, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'error', detail: 'permission problem'});
    }

    get dataStatisticsRevenues(): BigDecimal[] {
        return this.dashboardService.dataStatisticsRevenues;
    }

    set dataStatisticsRevenues(value: BigDecimal[]) {
        this.dashboardService.dataStatisticsRevenues = value;
    }

    get dataStatisticsExpensess(): BigDecimal[] {
        return this.dashboardService.dataStatisticsExpensess;
    }

    set dataStatisticsExpensess(value: BigDecimal[]) {
        this.dashboardService.dataStatisticsExpensess = value;
    }

    get dataStatisticsClients(): number[] {
        return this.dashboardService.dataStatisticsClients;
    }

    set dataStatisticsClients(value: number[]) {
        this.dashboardService.dataStatisticsClients = value;
    }

    get monthlyPaymentNumber(): number {
        return this._monthlyPaymentNumber;
    }

    get clientNumber(): number {
        return this._clientNumber;
    }

    get expensesNumber(): number {
        return this._expensesNumber;
    }

    get paymentsNumber(): number {
        return this._paymentsNumber;
    }

}
