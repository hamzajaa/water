import { Component } from '@angular/core';
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {DatePipe} from "@angular/common";
import {PaymentCategoryService} from "../../../../../../controller/service/PaymentCategory.service";
import {RoleService} from "../../../../../../controller/service/role.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../../../controller/service/Auth.service";
import {ExportService} from "../../../../../../controller/service/Export.service";
import {PaymentCategoryVo} from "../../../../../../controller/model/PaymentCategory.model";
import {environment} from "../../../../../../../environments/environment";

@Component({
  selector: 'app-payment-category-list-admin',
  templateUrl: './payment-category-list-admin.component.html',
  styleUrls: ['./payment-category-list-admin.component.scss']
})
export class PaymentCategoryListAdminComponent {



  findByCriteriaShow = false;
  cols: any[] = [];
  excelPdfButons: MenuItem[];
  exportData: any[] = [];
  criteriaData: any[] = [];
  fileName = 'PaymentCategory';

  items: MenuItem[];

  home: MenuItem;

  constructor(private datePipe: DatePipe, private paymentCategorysService: PaymentCategoryService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
  ) {
  }

  ngOnInit(): void {
    this.items = [
      {label: 'Payment Categories', routerLink: '/app/admin/waterBilling/payment-category/list'},

    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};

    this.loadPaymentCategorys();
    this.initExport();
    this.initCol();
  }

  // methods
  public async loadPaymentCategorys() {
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('PaymentCategory', 'list');
    isPermistted ? this.paymentCategorysService.findAll().subscribe(paymentCategorys => this.paymentCategorys = paymentCategorys, error => console.log(error))
        : this.messageService.add({severity: 'error', summary: 'error', detail: 'permission problem'});
  }

  public searchRequest() {
    this.paymentCategorysService.findByCriteria(this.searchPaymentCategory).subscribe(paymentCategorys => {

      this.paymentCategorys = paymentCategorys;
      // this.searchPaymentCategory = new PaymentCategoryVo();
    }, error => console.log(error));
  }

  public async editPaymentCategory(paymentCategorys: PaymentCategoryVo) {
    const isPermistted = await this.roleService.isPermitted('PaymentCategory', 'edit');
    if (isPermistted) {
      this.paymentCategorysService.findByIdWithAssociatedList(paymentCategorys).subscribe(res => {
        this.selectedPaymentCategory = res;
        this.editPaymentCategoryDialog = true;
      });
    } else {
      this.messageService.add({
        severity: 'error', summary: 'Errors', detail: 'permission problem'
      });
    }

  }

  public async viewPaymentCategory(paymentCategorys: PaymentCategoryVo) {
    const isPermistted = await this.roleService.isPermitted('PaymentCategory', 'view');
    if (isPermistted) {
      this.paymentCategorysService.findByIdWithAssociatedList(paymentCategorys).subscribe(res => {
        this.selectedPaymentCategory = res;
        this.viewPaymentCategoryDialog = true;
      });
    } else {
      this.messageService.add({
        severity: 'error', summary: 'error', detail: 'permission problem'
      });
    }

  }

  public async openCreatePaymentCategory(pojo: string) {
    const isPermistted = await this.roleService.isPermitted(pojo, 'add');
    if (isPermistted) {
      this.selectedPaymentCategory = new PaymentCategoryVo();
      this.createPaymentCategoryDialog = true;
    } else {
      this.messageService.add({
        severity: 'error', summary: 'error', detail: 'permission problem'
      });
    }

  }

  public async deletePaymentCategory(paymentCategorys: PaymentCategoryVo) {
    const isPermistted = await this.roleService.isPermitted('PaymentCategory', 'delete');
    if (isPermistted) {
      this.confirmationService.confirm({
        message: 'Do you want to delete this item (PaymentCategory) ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.paymentCategorysService.delete(paymentCategorys).subscribe(status => {
            if (status > 0) {
              const position = this.paymentCategorys.indexOf(paymentCategorys);
              position > -1 ? this.paymentCategorys.splice(position, 1) : false;
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'PaymentCategory Deleted',
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

  public async duplicatePaymentCategory(paymentCategorys: PaymentCategoryVo) {

    this.paymentCategorysService.findByIdWithAssociatedList(paymentCategorys).subscribe(
        res => {
          this.initDuplicatePaymentCategory(res);
          this.selectedPaymentCategory = res;
          this.selectedPaymentCategory.id = null;


          this.createPaymentCategoryDialog = true;

        });

  }

  initDuplicatePaymentCategory(res: PaymentCategoryVo) {


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
    this.exportData = this.paymentCategorys.map(e => {
      return {
        'Code': e.code,
        'UnityPrice': e.unityPrice,
        'DutyEngage': e.dutyEngage,
      }
    });

    this.criteriaData = [{
      'Code': this.searchPaymentCategory.code ? this.searchPaymentCategory.code : environment.emptyForExport,
      'Unity Price': this.searchPaymentCategory.unityPrice ? this.searchPaymentCategory.unityPrice : environment.emptyForExport,
      'Duty Engage': this.searchPaymentCategory.dutyEngage ? this.searchPaymentCategory.dutyEngage : environment.emptyForExport,
    }];

  }

  private initCol() {
    this.cols = [
      {field: 'code', header: 'Code'},
      {field: 'unityPrice', header: 'Unity Price'},
      {field: 'dutyEngage', header: 'Duty Engage'},
    ];
  }


  get paymentCategorys(): Array<PaymentCategoryVo> {
    return this.paymentCategorysService.paymentCategorys;
  }

  set paymentCategorys(value: Array<PaymentCategoryVo>) {
    this.paymentCategorysService.paymentCategorys = value;
  }

  get paymentCategorySelections(): Array<PaymentCategoryVo> {
    return this.paymentCategorysService.paymentCategorySelections;
  }

  set paymentCategorySelections(value: Array<PaymentCategoryVo>) {
    this.paymentCategorysService.paymentCategorySelections = value;
  }

  get selectedPaymentCategory(): PaymentCategoryVo {
    return this.paymentCategorysService.selectedPaymentCategory;
  }

  set selectedPaymentCategory(value: PaymentCategoryVo) {
    this.paymentCategorysService.selectedPaymentCategory = value;
  }

  get createPaymentCategoryDialog(): boolean {
    return this.paymentCategorysService.createPaymentCategoryDialog;
  }

  set createPaymentCategoryDialog(value: boolean) {
    this.paymentCategorysService.createPaymentCategoryDialog = value;
  }

  get editPaymentCategoryDialog(): boolean {
    return this.paymentCategorysService.editPaymentCategoryDialog;
  }

  set editPaymentCategoryDialog(value: boolean) {
    this.paymentCategorysService.editPaymentCategoryDialog = value;
  }

  get viewPaymentCategoryDialog(): boolean {
    return this.paymentCategorysService.viewPaymentCategoryDialog;
  }

  set viewPaymentCategoryDialog(value: boolean) {
    this.paymentCategorysService.viewPaymentCategoryDialog = value;
  }

  get searchPaymentCategory(): PaymentCategoryVo {
    return this.paymentCategorysService.searchPaymentCategory;
  }

  set searchPaymentCategory(value: PaymentCategoryVo) {
    this.paymentCategorysService.searchPaymentCategory = value;
  }

  get dateFormat() {
    return environment.dateFormatList;
  }
  
}
