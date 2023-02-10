import {Component, OnInit} from '@angular/core';
import {DefaultTemplateConfigurationService} from 'src/app/controller/service/DefaultTemplateConfiguration.service';
import {DefaultTemplateConfigurationVo} from 'src/app/controller/model/DefaultTemplateConfiguration.model';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {RoleService} from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';


import {TemplateEmailFtlService} from 'src/app/controller/service/TemplateEmailFtl.service';
import {TemplateEmailClotureService} from 'src/app/controller/service/TemplateEmailCloture.service';
import {TemplateSuiviService} from 'src/app/controller/service/TemplateSuivi.service';
import {TemplateEmailClientInjoinableService} from 'src/app/controller/service/TemplateEmailClientInjoinable.service';
import {TemplateEmailPlanificationService} from 'src/app/controller/service/TemplateEmailPlanification.service';
import {TemplateEmailReplanificationService} from 'src/app/controller/service/TemplateEmailReplanification.service';
import {TemplateEmailRefusService} from 'src/app/controller/service/TemplateEmailRefus.service';
import {
    TemplateEmailClientInjoinableKoscService
} from 'src/app/controller/service/TemplateEmailClientInjoinableKosc.service';
import {
    TemplateEmailConfirmationClientService
} from 'src/app/controller/service/TemplateEmailConfirmationClient.service';
import {TemplateEmailMauvaisContactService} from 'src/app/controller/service/TemplateEmailMauvaisContact.service';
import {TemplateEmailCriService} from 'src/app/controller/service/TemplateEmailCri.service';

import {TemplateEmailReplanificationVo} from 'src/app/controller/model/TemplateEmailReplanification.model';
import {TemplateEmailFtlVo} from 'src/app/controller/model/TemplateEmailFtl.model';
import {TemplateEmailClotureVo} from 'src/app/controller/model/TemplateEmailCloture.model';
import {TemplateEmailPlanificationVo} from 'src/app/controller/model/TemplateEmailPlanification.model';
import {TemplateSuiviVo} from 'src/app/controller/model/TemplateSuivi.model';
import {TemplateEmailRefusVo} from 'src/app/controller/model/TemplateEmailRefus.model';
import {TemplateEmailConfirmationClientVo} from 'src/app/controller/model/TemplateEmailConfirmationClient.model';
import {TemplateEmailClientInjoinableKoscVo} from 'src/app/controller/model/TemplateEmailClientInjoinableKosc.model';
import {TemplateEmailMauvaisContactVo} from 'src/app/controller/model/TemplateEmailMauvaisContact.model';
import {TemplateEmailClientInjoinableVo} from 'src/app/controller/model/TemplateEmailClientInjoinable.model';
import {TemplateEmailCriVo} from 'src/app/controller/model/TemplateEmailCri.model';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import {ExportService} from 'src/app/controller/service/Export.service';

@Component({
    selector: 'app-default-template-configuration-list-chercheur',
    templateUrl: './default-template-configuration-list-chercheur.component.html',
    styleUrls: ['./default-template-configuration-list-chercheur.component.css']
})
export class DefaultTemplateConfigurationListChercheurComponent implements OnInit {
    // declarations
    findByCriteriaShow = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'DefaultTemplateConfiguration';
    yesOrNoEnabled: any[] = [];
    templateEmailFtls: Array<TemplateEmailFtlVo>;
    templateEmailClotures: Array<TemplateEmailClotureVo>;
    templateSuivis: Array<TemplateSuiviVo>;
    templateEmailClientInjoinables: Array<TemplateEmailClientInjoinableVo>;
    templateEmailPlanifications: Array<TemplateEmailPlanificationVo>;
    templateEmailReplanifications: Array<TemplateEmailReplanificationVo>;
    templateEmailRefuss: Array<TemplateEmailRefusVo>;
    templateEmailClientInjoinableKoscs: Array<TemplateEmailClientInjoinableKoscVo>;
    templateEmailConfirmationClients: Array<TemplateEmailConfirmationClientVo>;
    templateEmailMauvaisContacts: Array<TemplateEmailMauvaisContactVo>;
    templateEmailCris: Array<TemplateEmailCriVo>;


    constructor(private datePipe: DatePipe, private defaultTemplateConfigurationService: DefaultTemplateConfigurationService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
        , private templateEmailFtlService: TemplateEmailFtlService
        , private templateEmailClotureService: TemplateEmailClotureService
        , private templateSuiviService: TemplateSuiviService
        , private templateEmailClientInjoinableService: TemplateEmailClientInjoinableService
        , private templateEmailPlanificationService: TemplateEmailPlanificationService
        , private templateEmailReplanificationService: TemplateEmailReplanificationService
        , private templateEmailRefusService: TemplateEmailRefusService
        , private templateEmailClientInjoinableKoscService: TemplateEmailClientInjoinableKoscService
        , private templateEmailConfirmationClientService: TemplateEmailConfirmationClientService
        , private templateEmailMauvaisContactService: TemplateEmailMauvaisContactService
        , private templateEmailCriService: TemplateEmailCriService
    ) {
    }

    get defaultTemplateConfigurations(): Array<DefaultTemplateConfigurationVo> {
        return this.defaultTemplateConfigurationService.defaultTemplateConfigurations;
    }

    set defaultTemplateConfigurations(value: Array<DefaultTemplateConfigurationVo>) {
        this.defaultTemplateConfigurationService.defaultTemplateConfigurations = value;
    }

    get defaultTemplateConfigurationSelections(): Array<DefaultTemplateConfigurationVo> {
        return this.defaultTemplateConfigurationService.defaultTemplateConfigurationSelections;
    }

    set defaultTemplateConfigurationSelections(value: Array<DefaultTemplateConfigurationVo>) {
        this.defaultTemplateConfigurationService.defaultTemplateConfigurationSelections = value;
    }

    get selectedDefaultTemplateConfiguration(): DefaultTemplateConfigurationVo {
        return this.defaultTemplateConfigurationService.selectedDefaultTemplateConfiguration;
    }

    set selectedDefaultTemplateConfiguration(value: DefaultTemplateConfigurationVo) {
        this.defaultTemplateConfigurationService.selectedDefaultTemplateConfiguration = value;
    }

    get createDefaultTemplateConfigurationDialog(): boolean {
        return this.defaultTemplateConfigurationService.createDefaultTemplateConfigurationDialog;
    }

    set createDefaultTemplateConfigurationDialog(value: boolean) {
        this.defaultTemplateConfigurationService.createDefaultTemplateConfigurationDialog = value;
    }

    get editDefaultTemplateConfigurationDialog(): boolean {
        return this.defaultTemplateConfigurationService.editDefaultTemplateConfigurationDialog;
    }

    set editDefaultTemplateConfigurationDialog(value: boolean) {
        this.defaultTemplateConfigurationService.editDefaultTemplateConfigurationDialog = value;
    }

    get viewDefaultTemplateConfigurationDialog(): boolean {
        return this.defaultTemplateConfigurationService.viewDefaultTemplateConfigurationDialog;
    }

    set viewDefaultTemplateConfigurationDialog(value: boolean) {
        this.defaultTemplateConfigurationService.viewDefaultTemplateConfigurationDialog = value;
    }

    get searchDefaultTemplateConfiguration(): DefaultTemplateConfigurationVo {
        return this.defaultTemplateConfigurationService.searchDefaultTemplateConfiguration;
    }

    set searchDefaultTemplateConfiguration(value: DefaultTemplateConfigurationVo) {
        this.defaultTemplateConfigurationService.searchDefaultTemplateConfiguration = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }

    ngOnInit(): void {
        this.loadDefaultTemplateConfigurations();
        this.initExport();
        this.initCol();
        this.loadTemplateEmailFtl();
        this.loadTemplateEmailCloture();
        this.loadTemplateSuivi();
        this.loadTemplateEmailClientInjoinable();
        this.loadTemplateEmailPlanification();
        this.loadTemplateEmailReplanification();
        this.loadTemplateEmailRefus();
        this.loadTemplateEmailClientInjoinableKosc();
        this.loadTemplateEmailConfirmationClient();
        this.loadTemplateEmailMauvaisContact();
        this.loadTemplateEmailCri();
        this.yesOrNoEnabled = [{label: 'Enabled', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    // methods
    public async loadDefaultTemplateConfigurations() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DefaultTemplateConfiguration', 'list');
        isPermistted ? this.defaultTemplateConfigurationService.findAll().subscribe(defaultTemplateConfigurations => this.defaultTemplateConfigurations = defaultTemplateConfigurations, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'error', detail: 'permission problem'});
    }

    public searchRequest() {
        this.defaultTemplateConfigurationService.findByCriteria(this.searchDefaultTemplateConfiguration).subscribe(defaultTemplateConfigurations => {

            this.defaultTemplateConfigurations = defaultTemplateConfigurations;
            // this.searchDefaultTemplateConfiguration = new DefaultTemplateConfigurationVo();
        }, error => console.log(error));
    }

    public async editDefaultTemplateConfiguration(defaultTemplateConfiguration: DefaultTemplateConfigurationVo) {
        const isPermistted = await this.roleService.isPermitted('DefaultTemplateConfiguration', 'edit');
        if (isPermistted) {
            this.defaultTemplateConfigurationService.findByIdWithAssociatedList(defaultTemplateConfiguration).subscribe(res => {
                this.selectedDefaultTemplateConfiguration = res;

                this.editDefaultTemplateConfigurationDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Errors', detail: 'permission problem'
            });
        }

    }

    public async viewDefaultTemplateConfiguration(defaultTemplateConfiguration: DefaultTemplateConfigurationVo) {
        const isPermistted = await this.roleService.isPermitted('DefaultTemplateConfiguration', 'view');
        if (isPermistted) {
            this.defaultTemplateConfigurationService.findByIdWithAssociatedList(defaultTemplateConfiguration).subscribe(res => {
                this.selectedDefaultTemplateConfiguration = res;

                this.viewDefaultTemplateConfigurationDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'error', detail: 'permission problem'
            });
        }

    }

    public async openCreateDefaultTemplateConfiguration(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedDefaultTemplateConfiguration = new DefaultTemplateConfigurationVo();
            this.createDefaultTemplateConfigurationDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'error', detail: 'permission problem'
            });
        }

    }

    public async deleteDefaultTemplateConfiguration(defaultTemplateConfiguration: DefaultTemplateConfigurationVo) {
        const isPermistted = await this.roleService.isPermitted('DefaultTemplateConfiguration', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Do you want to delete this item (Default template configuration) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.defaultTemplateConfigurationService.delete(defaultTemplateConfiguration).subscribe(status => {
                        if (status > 0) {
                            const position = this.defaultTemplateConfigurations.indexOf(defaultTemplateConfiguration);
                            position > -1 ? this.defaultTemplateConfigurations.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'Default template configuration Deleted',
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

    public async loadTemplateEmailFtl() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DefaultTemplateConfiguration', 'list');
        isPermistted ? this.templateEmailFtlService.findAll().subscribe(templateEmailFtls => this.templateEmailFtls = templateEmailFtls, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Errors', detail: 'permission problem'});

    }

    public async loadTemplateEmailCloture() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DefaultTemplateConfiguration', 'list');
        isPermistted ? this.templateEmailClotureService.findAll().subscribe(templateEmailClotures => this.templateEmailClotures = templateEmailClotures, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Errors', detail: 'permission problem'});

    }

    // getters and setters

    public async loadTemplateSuivi() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DefaultTemplateConfiguration', 'list');
        isPermistted ? this.templateSuiviService.findAll().subscribe(templateSuivis => this.templateSuivis = templateSuivis, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Errors', detail: 'permission problem'});

    }

    public async loadTemplateEmailClientInjoinable() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DefaultTemplateConfiguration', 'list');
        isPermistted ? this.templateEmailClientInjoinableService.findAll().subscribe(templateEmailClientInjoinables => this.templateEmailClientInjoinables = templateEmailClientInjoinables, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Errors', detail: 'permission problem'});

    }



    public async loadTemplateEmailPlanification() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DefaultTemplateConfiguration', 'list');
        isPermistted ? this.templateEmailPlanificationService.findAll().subscribe(templateEmailPlanifications => this.templateEmailPlanifications = templateEmailPlanifications, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Errors', detail: 'permission problem'});

    }

    public async loadTemplateEmailReplanification() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DefaultTemplateConfiguration', 'list');
        isPermistted ? this.templateEmailReplanificationService.findAll().subscribe(templateEmailReplanifications => this.templateEmailReplanifications = templateEmailReplanifications, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Errors', detail: 'permission problem'});

    }

    public async loadTemplateEmailRefus() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DefaultTemplateConfiguration', 'list');
        isPermistted ? this.templateEmailRefusService.findAll().subscribe(templateEmailRefuss => this.templateEmailRefuss = templateEmailRefuss, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Errors', detail: 'permission problem'});

    }

    public async loadTemplateEmailClientInjoinableKosc() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DefaultTemplateConfiguration', 'list');
        isPermistted ? this.templateEmailClientInjoinableKoscService.findAll().subscribe(templateEmailClientInjoinableKoscs => this.templateEmailClientInjoinableKoscs = templateEmailClientInjoinableKoscs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Errors', detail: 'permission problem'});

    }

    public async loadTemplateEmailConfirmationClient() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DefaultTemplateConfiguration', 'list');
        isPermistted ? this.templateEmailConfirmationClientService.findAll().subscribe(templateEmailConfirmationClients => this.templateEmailConfirmationClients = templateEmailConfirmationClients, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Errors', detail: 'permission problem'});

    }

    public async loadTemplateEmailMauvaisContact() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DefaultTemplateConfiguration', 'list');
        isPermistted ? this.templateEmailMauvaisContactService.findAll().subscribe(templateEmailMauvaisContacts => this.templateEmailMauvaisContacts = templateEmailMauvaisContacts, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Errors', detail: 'permission problem'});

    }

    public async loadTemplateEmailCri() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('DefaultTemplateConfiguration', 'list');
        isPermistted ? this.templateEmailCriService.findAll().subscribe(templateEmailCris => this.templateEmailCris = templateEmailCris, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Errors', detail: 'permission problem'});

    }

    public async duplicateDefaultTemplateConfiguration(defaultTemplateConfiguration: DefaultTemplateConfigurationVo) {

        this.defaultTemplateConfigurationService.findByIdWithAssociatedList(defaultTemplateConfiguration).subscribe(
            res => {
                this.initDuplicateDefaultTemplateConfiguration(res);
                this.selectedDefaultTemplateConfiguration = res;
                this.selectedDefaultTemplateConfiguration.id = null;


                this.createDefaultTemplateConfigurationDialog = true;

            });

    }

    initDuplicateDefaultTemplateConfiguration(res: DefaultTemplateConfigurationVo) {


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
        this.exportData = this.defaultTemplateConfigurations.map(e => {
            return {
                'Email kosc': e.emailKosc,
                'Email maneo': e.emailManeo,
                'Template email ftl': e.templateEmailFtlVo?.libelle,
                'Template email cloture': e.templateEmailClotureVo?.libelle,
                'Template suivi': e.templateSuiviVo?.libelle,
                'Template email client injoinable': e.templateEmailClientInjoinableVo?.libelle,
                'Template email planification': e.templateEmailPlanificationVo?.libelle,
                'Template email replanification': e.templateEmailReplanificationVo?.libelle,
                'Template email refus': e.templateEmailRefusVo?.libelle,
                'Template email client injoinable kosc': e.templateEmailClientInjoinableKoscVo?.libelle,
                'Template email confirmation client': e.templateEmailConfirmationClientVo?.libelle,
                'Template email mauvais contact': e.templateEmailMauvaisContactVo?.libelle,
                'Template email cri': e.templateEmailCriVo?.libelle,
                'Enabled': e.enabled ? 'Vrai' : 'Faux',
            }
        });

        this.criteriaData = [{
            'Email kosc': this.searchDefaultTemplateConfiguration.emailKosc ? this.searchDefaultTemplateConfiguration.emailKosc : environment.emptyForExport,
            'Email maneo': this.searchDefaultTemplateConfiguration.emailManeo ? this.searchDefaultTemplateConfiguration.emailManeo : environment.emptyForExport,
            'Template email ftl': this.searchDefaultTemplateConfiguration.templateEmailFtlVo?.libelle ? this.searchDefaultTemplateConfiguration.templateEmailFtlVo?.libelle : environment.emptyForExport,
            'Template email cloture': this.searchDefaultTemplateConfiguration.templateEmailClotureVo?.libelle ? this.searchDefaultTemplateConfiguration.templateEmailClotureVo?.libelle : environment.emptyForExport,
            'Template suivi': this.searchDefaultTemplateConfiguration.templateSuiviVo?.libelle ? this.searchDefaultTemplateConfiguration.templateSuiviVo?.libelle : environment.emptyForExport,
            'Template email client injoinable': this.searchDefaultTemplateConfiguration.templateEmailClientInjoinableVo?.libelle ? this.searchDefaultTemplateConfiguration.templateEmailClientInjoinableVo?.libelle : environment.emptyForExport,
            'Template email planification': this.searchDefaultTemplateConfiguration.templateEmailPlanificationVo?.libelle ? this.searchDefaultTemplateConfiguration.templateEmailPlanificationVo?.libelle : environment.emptyForExport,
            'Template email replanification': this.searchDefaultTemplateConfiguration.templateEmailReplanificationVo?.libelle ? this.searchDefaultTemplateConfiguration.templateEmailReplanificationVo?.libelle : environment.emptyForExport,
            'Template email refus': this.searchDefaultTemplateConfiguration.templateEmailRefusVo?.libelle ? this.searchDefaultTemplateConfiguration.templateEmailRefusVo?.libelle : environment.emptyForExport,
            'Template email client injoinable kosc': this.searchDefaultTemplateConfiguration.templateEmailClientInjoinableKoscVo?.libelle ? this.searchDefaultTemplateConfiguration.templateEmailClientInjoinableKoscVo?.libelle : environment.emptyForExport,
            'Template email confirmation client': this.searchDefaultTemplateConfiguration.templateEmailConfirmationClientVo?.libelle ? this.searchDefaultTemplateConfiguration.templateEmailConfirmationClientVo?.libelle : environment.emptyForExport,
            'Template email mauvais contact': this.searchDefaultTemplateConfiguration.templateEmailMauvaisContactVo?.libelle ? this.searchDefaultTemplateConfiguration.templateEmailMauvaisContactVo?.libelle : environment.emptyForExport,
            'Template email cri': this.searchDefaultTemplateConfiguration.templateEmailCriVo?.libelle ? this.searchDefaultTemplateConfiguration.templateEmailCriVo?.libelle : environment.emptyForExport,
            'Enabled': this.searchDefaultTemplateConfiguration.enabled ? (this.searchDefaultTemplateConfiguration.enabled ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
        }];

    }

    private initCol() {
        this.cols = [
            {field: 'emailKosc', header: 'Email kosc'},
            {field: 'emailManeo', header: 'Email maneo'},
            {field: 'templateEmailFtl?.libelle', header: 'Template email ftl'},
            {field: 'templateEmailCloture?.libelle', header: 'Template email cloture'},
            {field: 'templateSuivi?.libelle', header: 'Template suivi'},
            {field: 'templateEmailClientInjoinable?.libelle', header: 'Template email client injoinable'},
            {field: 'templateEmailReport?.libelle', header: 'Template email report'},
            {field: 'templateEmailPlanification?.libelle', header: 'Template email planification'},
            {field: 'templateEmailReplanification?.libelle', header: 'Template email replanification'},
            {field: 'templateEmailRefus?.libelle', header: 'Template email refus'},
            {field: 'templateEmailClientInjoinableKosc?.libelle', header: 'Template email client injoinable kosc'},
            {field: 'templateEmailConfirmationClient?.libelle', header: 'Template email confirmation client'},
            {field: 'templateEmailMauvaisContact?.libelle', header: 'Template email mauvais contact'},
            {field: 'templateEmailCri?.libelle', header: 'Template email cri'},
            {field: 'enabled', header: 'Enabled'},
        ];
    }


}
