import {Component} from '@angular/core';
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {DatePipe} from "@angular/common";
import {ClientService} from "../../../../../../controller/service/Client.service";
import {RoleService} from "../../../../../../controller/service/role.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../../../controller/service/Auth.service";
import {ExportService} from "../../../../../../controller/service/Export.service";
import {ClientVo} from "../../../../../../controller/model/Client.model";
import {environment} from "../../../../../../../environments/environment";

@Component({
    selector: 'app-client-list-admin',
    templateUrl: './client-list-admin.component.html',
    styleUrls: ['./client-list-admin.component.scss']
})
export class ClientListAdminComponent {

    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Client';

    items: MenuItem[];

    home: MenuItem;

    constructor(private datePipe: DatePipe, private clientsService: ClientService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
    ) {
    }

    get clients(): Array<ClientVo> {
        return this.clientsService.clients;
    }

    set clients(value: Array<ClientVo>) {
        this.clientsService.clients = value;
    }

    get clientSelections(): Array<ClientVo> {
        return this.clientsService.clientSelections;
    }

    set clientSelections(value: Array<ClientVo>) {
        this.clientsService.clientSelections = value;
    }

    get selectedClient(): ClientVo {
        return this.clientsService.selectedClient;
    }

    set selectedClient(value: ClientVo) {
        this.clientsService.selectedClient = value;
    }

    get createClientDialog(): boolean {
        return this.clientsService.createClientDialog;
    }

    set createClientDialog(value: boolean) {
        this.clientsService.createClientDialog = value;
    }

    get editClientDialog(): boolean {
        return this.clientsService.editClientDialog;
    }

    set editClientDialog(value: boolean) {
        this.clientsService.editClientDialog = value;
    }

    get viewClientDialog(): boolean {
        return this.clientsService.viewClientDialog;
    }

    set viewClientDialog(value: boolean) {
        this.clientsService.viewClientDialog = value;
    }

    get searchClient(): ClientVo {
        return this.clientsService.searchClient;
    }

    // getters and setters

    set searchClient(value: ClientVo) {
        this.clientsService.searchClient = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }

    ngOnInit(): void {
        this.items = [
            {label: 'clients', routerLink: '/app/admin/waterBilling/client/list'},

        ];
        this.home = {icon: 'pi pi-home', routerLink: '/'};

        this.loadClients();
        this.initExport();
        this.initCol();
    }

    // methods
    public async loadClients() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Client', 'list');
        isPermistted ? this.clientsService.findAll().subscribe(clients => this.clients = clients, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'error', detail: 'permission problem'});
    }

    public searchRequest() {
        this.clientsService.findByCriteria(this.searchClient).subscribe(clients => {

            this.clients = clients;
            // this.searchClient = new ClientVo();
        }, error => console.log(error));
    }

    public async editClient(client: ClientVo) {
        const isPermistted = await this.roleService.isPermitted('Client', 'edit');
        if (isPermistted) {
            this.clientsService.findByIdWithAssociatedList(client).subscribe(res => {
                this.selectedClient = res;
                this.selectedClient.recordDate = new Date(client.recordDate);
                console.log(res);
                this.editClientDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Errors', detail: 'permission problem'
            });
        }

    }

    public async viewClient(clients: ClientVo) {
        const isPermistted = await this.roleService.isPermitted('Client', 'view');
        if (isPermistted) {
            this.clientsService.findByIdWithAssociatedList(clients).subscribe(res => {
                this.selectedClient = res;
                this.viewClientDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'error', detail: 'permission problem'
            });
        }

    }

    public async openCreateClient(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedClient = new ClientVo();
            this.createClientDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'error', detail: 'permission problem'
            });
        }

    }

    public async deleteClient(clients: ClientVo) {
        const isPermistted = await this.roleService.isPermitted('Client', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Do you want to delete this item (Client) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.clientsService.delete(clients).subscribe(status => {
                        if (status > 0) {
                            const position = this.clients.indexOf(clients);
                            position > -1 ? this.clients.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'Client Deleted',
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

    public async duplicateClient(clients: ClientVo) {

        this.clientsService.findByIdWithAssociatedList(clients).subscribe(
            res => {
                this.initDuplicateClient(res);
                this.selectedClient = res;
                this.selectedClient.id = null;


                this.createClientDialog = true;

            });

    }

    initDuplicateClient(res: ClientVo) {


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
        this.exportData = this.clients.map(e => {
            return {
                'User Name': e.userName,
                'Cni': e.cni,
                'Address': e.address,
                'Phone': e.phone,
                'Counter Number': e.counterNumber,
                'DutyEngage Price': e.dutyEngagePrice,
                'Status DutyEngage Price': e.statusDutyEngagePrice,
                'Record Date': this.datePipe.transform(e.recordDate, 'dd/MM/yyyy hh:mm'),
            }
        });

        this.criteriaData = [{
            'User Name': this.searchClient.userName ? this.searchClient.userName : environment.emptyForExport,
            'Cni': this.searchClient.cni ? this.searchClient.cni : environment.emptyForExport,
            'Address': this.searchClient.address ? this.searchClient.address : environment.emptyForExport,
            'Phone': this.searchClient.phone ? this.searchClient.phone : environment.emptyForExport,
            'Counter Number': this.searchClient.counterNumber ? this.searchClient.counterNumber : environment.emptyForExport,
            'DutyEngage Price': this.searchClient.dutyEngagePrice ? this.searchClient.dutyEngagePrice : environment.emptyForExport,
            'Status DutyEngage Price': this.searchClient.statusDutyEngagePrice ? this.searchClient.statusDutyEngagePrice : environment.emptyForExport,
            'Record Date': this.searchClient.recordDate ? this.datePipe.transform(this.searchClient.recordDate, this.dateFormat) : environment.emptyForExport,
        }];

    }

    private initCol() {
        this.cols = [
            {field: 'userName', header: 'User Name'},
            {field: 'cni', header: 'Cni'},
            {field: 'cni', header: 'Cni'},
            {field: 'address', header: 'Address'},
            {field: 'phone', header: 'Phone'},
            {field: 'counterNumber', header: 'Counter Number'},
            {field: 'dutyEngagePrice', header: 'DutyEngage Price'},
            {field: 'statusDutyEngagePrice', header: 'Status DutyEngage Price'},
            {field: 'recordDate', header: 'Record Date'},
        ];
    }
}
