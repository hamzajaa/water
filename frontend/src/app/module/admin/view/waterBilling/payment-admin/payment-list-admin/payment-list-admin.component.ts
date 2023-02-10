import {Component} from '@angular/core';
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {ClientVo} from "../../../../../../controller/model/Client.model";
import {DatePipe} from "@angular/common";
import {PaymentService} from "../../../../../../controller/service/Payment.service";
import {RoleService} from "../../../../../../controller/service/role.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../../../controller/service/Auth.service";
import {ExportService} from "../../../../../../controller/service/Export.service";
import {ClientService} from "../../../../../../controller/service/Client.service";
import {PaymentVo} from "../../../../../../controller/model/Payment.model";
import {environment} from "../../../../../../../environments/environment";
import {PaymentStatusService} from "../../../../../../controller/service/PaymentStatus.service";
import {PaymentStatusVo} from "../../../../../../controller/model/PaymentStatus.model";
import {PaymentCategoryService} from "../../../../../../controller/service/PaymentCategory.service";
import {PaymentCategoryVo} from "../../../../../../controller/model/PaymentCategory.model";
import {Observable} from "rxjs";
import {HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse} from "@angular/common/http";

// import {PaymentExcelService} from "../../../../../../controller/service/PaymentExcel.service";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'multipart/form-data'})
};

@Component({
    selector: 'app-payment-list-admin',
    templateUrl: './payment-list-admin.component.html',
    styleUrls: ['./payment-list-admin.component.scss']
})
export class PaymentListAdminComponent {


    // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Payment';
    clients: Array<ClientVo>;
    paymentCategorys: Array<PaymentCategoryVo>;
    paymentStatuss: Array<PaymentStatusVo>;
    items: MenuItem[];

    home: MenuItem;
    showSpinner = false;

    constructor(private datePipe: DatePipe, private paymentService: PaymentService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
        , private clientService: ClientService
        , private paymentStatusService: PaymentStatusService
        , private paymentCategoryService: PaymentCategoryService
        , private http: HttpClient
                // , private paymentExcelService: PaymentExcelService
    ) {
    }

    uploadedFiles: any[] = [];
    displayImport = false;
    selectedFile: File;

    fileChange(event: any) {
        this.showSpinner = true;
        this.selectedFile = event.target.files[0];
        const formData = new FormData();
        formData.append('file', this.selectedFile, this.selectedFile.name);
        this.paymentService.importDataAll(formData).subscribe({
            next: (event) => {
                this.loadPayments();
                this.showSpinner = false;
            },
            error: () => {
                this.showSpinner = false
            }
        });

    }

    async showDisplayImport() {
        this.displayImport = true;
    }

    async hideDisplayImport() {
        this.displayImport = false;
    }


    // methods
    ngOnInit(): void {
        this.loadPayments();
        this.initExport();
        this.initCol();
        this.loadClient();
        this.loadPaymentCategorys();
        this.loadPaymentStatus();

        this.items = [
            {label: 'Payments', routerLink: '/app/admin/waterBilling/payment/list'},

        ];

        this.home = {icon: 'pi pi-home', routerLink: '/'};
    }

    public async loadPayments() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Payment', 'list');
        isPermistted ? this.paymentService.findAll().subscribe(payments => this.payments = payments, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'error', detail: 'permission problem'});
    }

    public searchRequest() {
        this.paymentService.findByCriteria(this.searchPayment).subscribe(payments => {

            this.payments = payments;
            // this.searchPayment = new PaymentVo();
        }, error => console.log(error));
    }

    public async editPayment(payment: PaymentVo) {
        const isPermistted = await this.roleService.isPermitted('Payment', 'edit');
        if (isPermistted) {
            this.paymentService.findByIdWithAssociatedList(payment).subscribe(res => {
                this.selectedPayment = res;
                this.selectedPayment.datePay = new Date(payment.datePay);

                this.editPaymentDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Errors', detail: 'permission problem'
            });
        }

    }

    public async viewPayment(payment: PaymentVo) {
        const isPermistted = await this.roleService.isPermitted('Payment', 'view');
        if (isPermistted) {
            this.paymentService.findByIdWithAssociatedList(payment).subscribe(res => {
                this.selectedPayment = res;
                this.selectedPayment.datePay = new Date(payment.datePay);
                this.viewPaymentDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'error', detail: 'permission problem'
            });
        }

    }

    public async openCreatePayment(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedPayment = new PaymentVo();
            this.createPaymentDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'error', detail: 'permission problem'
            });
        }

    }

    public async deletePayment(payment: PaymentVo) {
        const isPermistted = await this.roleService.isPermitted('Payment', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Do you want to delete this item (Payment) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.paymentService.delete(payment).subscribe(status => {
                        if (status > 0) {
                            const position = this.payments.indexOf(payment);
                            position > -1 ? this.payments.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'Payment Deleted',
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

    public async loadClient() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Payment', 'list');
        isPermistted ? this.clientService.findAll().subscribe(clients => this.clients = clients, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Errors', detail: 'permission problem'});

    }

    public async loadPaymentCategorys() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PaymentCategory', 'list');
        isPermistted ? this.paymentCategoryService.findAll().subscribe(paymentCategorys => this.paymentCategorys = paymentCategorys, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Errors', detail: 'permission problem'});

    }

    public async loadPaymentStatus() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PaymentStatus', 'list');
        isPermistted ? this.paymentStatusService.findAll().subscribe(paymentStatuss => this.paymentStatuss = paymentStatuss, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Errors', detail: 'permission problem'});

    }

    public async duplicatePayment(payment: PaymentVo) {

        this.paymentService.findByIdWithAssociatedList(payment).subscribe(
            res => {
                this.initDuplicatePayment(res);
                this.selectedPayment = res;
                this.selectedPayment.id = null;


                this.createPaymentDialog = true;

            });

    }

    // importerDataBase(event: any) {
    //     this.showSpinner = true;
    //     this.paymentExcelService.importerDataBase(event).subscribe({
    //         next: () => {
    //             this.showSpinner = false;
    //         },
    //         error: () => {
    //             this.showSpinner = false;
    //         }
    //     });
    // }

    initDuplicatePayment(res: PaymentVo) {


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
        this.exportData = this.payments.map(e => {
            return {
                'Previous Number': e.previousNumber,
                'New Number': e.newNumber,
                'Consumption Rate': e.consumptionRate,
                'Total Pay': e.totalPay,
                'Client': e.clientVo?.userName,
                'Payment Status': e.paymentStatusVo?.libel,
                'Date Pay': this.datePipe.transform(e.datePay, 'dd/MM/yyyy hh:mm'),
            }
        });

        this.criteriaData = [{
            'PreviousNumber': this.searchPayment.previousNumber ? this.searchPayment.previousNumber : environment.emptyForExport,
            'NewNumber': this.searchPayment.newNumber ? this.searchPayment.newNumber : environment.emptyForExport,
            'ConsumptionRate': this.searchPayment.consumptionRate ? this.searchPayment.consumptionRate : environment.emptyForExport,
            'TotalPay': this.searchPayment.totalPay ? this.searchPayment.totalPay : environment.emptyForExport,
            'Client': this.searchPayment.clientVo?.userName ? this.searchPayment.clientVo?.userName : environment.emptyForExport,
            'PaymentStatus': this.searchPayment.paymentStatusVo?.libel ? this.searchPayment.paymentStatusVo?.libel : environment.emptyForExport,
            'Date Pay Min': this.searchPayment.datePayMin ? this.datePipe.transform(this.searchPayment.datePayMin, this.dateFormat) : environment.emptyForExport,
            'Date Pay Max': this.searchPayment.datePayMax ? this.datePipe.transform(this.searchPayment.datePayMax, this.dateFormat) : environment.emptyForExport
        }];

    }

    private initCol() {
        this.cols = [
            {field: 'previousNumber', header: 'Previous Number'},
            {field: 'newNumber', header: 'New Number'},
            {field: 'consumptionRate', header: 'Consumption Rate'},
            {field: 'totalPay', header: 'Total Pay'},
            {field: 'client?.name', header: 'Client'},
            {field: 'paymentStatus?.name', header: 'Payment Status'},
            {field: 'datePay', header: 'Date Pay'},
        ];
    }

// getter and setter
    get payments(): Array<PaymentVo> {
        return this.paymentService.payments;
    }

    set payments(value: Array<PaymentVo>) {
        this.paymentService.payments = value;
    }

    get paymentSelections(): Array<PaymentVo> {
        return this.paymentService.paymentSelections;
    }

    set paymentSelections(value: Array<PaymentVo>) {
        this.paymentService.paymentSelections = value;
    }

    get selectedPayment(): PaymentVo {
        return this.paymentService.selectedPayment;
    }

    set selectedPayment(value: PaymentVo) {
        this.paymentService.selectedPayment = value;
    }

    get createPaymentDialog(): boolean {
        return this.paymentService.createPaymentDialog;
    }

    set createPaymentDialog(value: boolean) {
        this.paymentService.createPaymentDialog = value;
    }

    get editPaymentDialog(): boolean {
        return this.paymentService.editPaymentDialog;
    }

    set editPaymentDialog(value: boolean) {
        this.paymentService.editPaymentDialog = value;
    }

    get viewPaymentDialog(): boolean {
        return this.paymentService.viewPaymentDialog;
    }

    set viewPaymentDialog(value: boolean) {
        this.paymentService.viewPaymentDialog = value;
    }

    get searchPayment(): PaymentVo {
        return this.paymentService.searchPayment;
    }

    set searchPayment(value: PaymentVo) {
        this.paymentService.searchPayment = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }

}
