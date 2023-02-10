import { Component } from '@angular/core';
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {DatePipe} from "@angular/common";
import {PaymentStatusService} from "../../../../../../controller/service/PaymentStatus.service";
import {RoleService} from "../../../../../../controller/service/role.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../../../controller/service/Auth.service";
import {ExportService} from "../../../../../../controller/service/Export.service";
import {PaymentStatusVo} from "../../../../../../controller/model/PaymentStatus.model";
import {environment} from "../../../../../../../environments/environment";

@Component({
  selector: 'app-payment-status-list-admin',
  templateUrl: './payment-status-list-admin.component.html',
  styleUrls: ['./payment-status-list-admin.component.scss']
})
export class PaymentStatusListAdminComponent {



  findByCriteriaShow = false;
  cols: any[] = [];
  excelPdfButons: MenuItem[];
  exportData: any[] = [];
  criteriaData: any[] = [];
  fileName = 'PaymentStatus';

  items: MenuItem[];

  home: MenuItem;

  constructor(private datePipe: DatePipe, private paymentStatussService: PaymentStatusService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
  ) {
  }

  ngOnInit(): void {
    this.items = [
      {label: 'Payments Status', routerLink: '/app/admin/waterBilling/payment-status/list'},

    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};

    this.loadPaymentStatuss();
    this.initExport();
    this.initCol();
  }

  // methods
  public async loadPaymentStatuss() {
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('PaymentStatus', 'list');
    isPermistted ? this.paymentStatussService.findAll().subscribe(paymentStatuss => this.paymentStatuss = paymentStatuss, error => console.log(error))
        : this.messageService.add({severity: 'error', summary: 'error', detail: 'permission problem'});
  }

  public searchRequest() {
    this.paymentStatussService.findByCriteria(this.searchPaymentStatus).subscribe(paymentStatuss => {

      this.paymentStatuss = paymentStatuss;
      // this.searchPaymentStatus = new PaymentStatusVo();
    }, error => console.log(error));
  }

  public async editPaymentStatus(paymentStatuss: PaymentStatusVo) {
    const isPermistted = await this.roleService.isPermitted('PaymentStatus', 'edit');
    if (isPermistted) {
      this.paymentStatussService.findByIdWithAssociatedList(paymentStatuss).subscribe(res => {
        this.selectedPaymentStatus = res;
        this.editPaymentStatusDialog = true;
      });
    } else {
      this.messageService.add({
        severity: 'error', summary: 'Errors', detail: 'permission problem'
      });
    }

  }

  public async viewPaymentStatus(paymentStatuss: PaymentStatusVo) {
    const isPermistted = await this.roleService.isPermitted('PaymentStatus', 'view');
    if (isPermistted) {
      this.paymentStatussService.findByIdWithAssociatedList(paymentStatuss).subscribe(res => {
        this.selectedPaymentStatus = res;
        this.viewPaymentStatusDialog = true;
      });
    } else {
      this.messageService.add({
        severity: 'error', summary: 'error', detail: 'permission problem'
      });
    }

  }

  public async openCreatePaymentStatus(pojo: string) {
    const isPermistted = await this.roleService.isPermitted(pojo, 'add');
    if (isPermistted) {
      this.selectedPaymentStatus = new PaymentStatusVo();
      this.createPaymentStatusDialog = true;
    } else {
      this.messageService.add({
        severity: 'error', summary: 'error', detail: 'permission problem'
      });
    }

  }

  public async deletePaymentStatus(paymentStatuss: PaymentStatusVo) {
    const isPermistted = await this.roleService.isPermitted('PaymentStatus', 'delete');
    if (isPermistted) {
      this.confirmationService.confirm({
        message: 'Do you want to delete this item (PaymentStatus) ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.paymentStatussService.delete(paymentStatuss).subscribe(status => {
            if (status > 0) {
              const position = this.paymentStatuss.indexOf(paymentStatuss);
              position > -1 ? this.paymentStatuss.splice(position, 1) : false;
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'PaymentStatus Deleted',
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

  public async duplicatePaymentStatus(paymentStatuss: PaymentStatusVo) {

    this.paymentStatussService.findByIdWithAssociatedList(paymentStatuss).subscribe(
        res => {
          this.initDuplicatePaymentStatus(res);
          this.selectedPaymentStatus = res;
          this.selectedPaymentStatus.id = null;


          this.createPaymentStatusDialog = true;

        });

  }

  initDuplicatePaymentStatus(res: PaymentStatusVo) {


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
    this.exportData = this.paymentStatuss.map(e => {
      return {
        'Code': e.code,
        'Libel': e.libel,
      }
    });

    this.criteriaData = [{
      'Code': this.searchPaymentStatus.code ? this.searchPaymentStatus.code : environment.emptyForExport,
      'Libel': this.searchPaymentStatus.libel ? this.searchPaymentStatus.libel : environment.emptyForExport,
    }];

  }

  private initCol() {
    this.cols = [
      {field: 'code', header: 'Code'},
      {field: 'libel', header: 'Libel'},
    ];
  }


  get paymentStatuss(): Array<PaymentStatusVo> {
    return this.paymentStatussService.paymentStatuss;
  }

  set paymentStatuss(value: Array<PaymentStatusVo>) {
    this.paymentStatussService.paymentStatuss = value;
  }

  get paymentStatusSelections(): Array<PaymentStatusVo> {
    return this.paymentStatussService.paymentStatusSelections;
  }

  set paymentStatusSelections(value: Array<PaymentStatusVo>) {
    this.paymentStatussService.paymentStatusSelections = value;
  }

  get selectedPaymentStatus(): PaymentStatusVo {
    return this.paymentStatussService.selectedPaymentStatus;
  }

  set selectedPaymentStatus(value: PaymentStatusVo) {
    this.paymentStatussService.selectedPaymentStatus = value;
  }

  get createPaymentStatusDialog(): boolean {
    return this.paymentStatussService.createPaymentStatusDialog;
  }

  set createPaymentStatusDialog(value: boolean) {
    this.paymentStatussService.createPaymentStatusDialog = value;
  }

  get editPaymentStatusDialog(): boolean {
    return this.paymentStatussService.editPaymentStatusDialog;
  }

  set editPaymentStatusDialog(value: boolean) {
    this.paymentStatussService.editPaymentStatusDialog = value;
  }

  get viewPaymentStatusDialog(): boolean {
    return this.paymentStatussService.viewPaymentStatusDialog;
  }

  set viewPaymentStatusDialog(value: boolean) {
    this.paymentStatussService.viewPaymentStatusDialog = value;
  }

  get searchPaymentStatus(): PaymentStatusVo {
    return this.paymentStatussService.searchPaymentStatus;
  }

  set searchPaymentStatus(value: PaymentStatusVo) {
    this.paymentStatussService.searchPaymentStatus = value;
  }

  get dateFormat() {
    return environment.dateFormatList;
  }

}
