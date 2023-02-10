import {Component, OnInit} from '@angular/core';
import {DefaultTemplateConfigurationService} from 'src/app/controller/service/DefaultTemplateConfiguration.service';
import {DefaultTemplateConfigurationVo} from 'src/app/controller/model/DefaultTemplateConfiguration.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {TemplateEmailClientInjoinableVo} from 'src/app/controller/model/TemplateEmailClientInjoinable.model';
import {TemplateEmailClientInjoinableService} from 'src/app/controller/service/TemplateEmailClientInjoinable.service';
import {TemplateEmailMauvaisContactVo} from 'src/app/controller/model/TemplateEmailMauvaisContact.model';
import {TemplateEmailMauvaisContactService} from 'src/app/controller/service/TemplateEmailMauvaisContact.service';
import {TemplateEmailReplanificationVo} from 'src/app/controller/model/TemplateEmailReplanification.model';
import {TemplateEmailReplanificationService} from 'src/app/controller/service/TemplateEmailReplanification.service';
import {TemplateEmailFtlVo} from 'src/app/controller/model/TemplateEmailFtl.model';
import {TemplateEmailFtlService} from 'src/app/controller/service/TemplateEmailFtl.service';
import {TemplateEmailRefusVo} from 'src/app/controller/model/TemplateEmailRefus.model';
import {TemplateEmailRefusService} from 'src/app/controller/service/TemplateEmailRefus.service';
import {TemplateSuiviVo} from 'src/app/controller/model/TemplateSuivi.model';
import {TemplateSuiviService} from 'src/app/controller/service/TemplateSuivi.service';
import {TemplateEmailClientInjoinableKoscVo} from 'src/app/controller/model/TemplateEmailClientInjoinableKosc.model';
import {
    TemplateEmailClientInjoinableKoscService
} from 'src/app/controller/service/TemplateEmailClientInjoinableKosc.service';
import {TemplateEmailClotureVo} from 'src/app/controller/model/TemplateEmailCloture.model';
import {TemplateEmailClotureService} from 'src/app/controller/service/TemplateEmailCloture.service';
import {TemplateEmailConfirmationClientVo} from 'src/app/controller/model/TemplateEmailConfirmationClient.model';
import {
    TemplateEmailConfirmationClientService
} from 'src/app/controller/service/TemplateEmailConfirmationClient.service';
import {TemplateEmailPlanificationVo} from 'src/app/controller/model/TemplateEmailPlanification.model';
import {TemplateEmailPlanificationService} from 'src/app/controller/service/TemplateEmailPlanification.service';
import {TemplateEmailCriVo} from 'src/app/controller/model/TemplateEmailCri.model';
import {TemplateEmailCriService} from 'src/app/controller/service/TemplateEmailCri.service';

@Component({
    selector: 'app-default-template-configuration-edit-chercheur',
    templateUrl: './default-template-configuration-edit-chercheur.component.html',
    styleUrls: ['./default-template-configuration-edit-chercheur.component.css']
})
export class DefaultTemplateConfigurationEditChercheurComponent implements OnInit {

    constructor(private datePipe: DatePipe, private defaultTemplateConfigurationService: DefaultTemplateConfigurationService
        , private stringUtilService: StringUtilService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
        , private templateEmailClientInjoinableService: TemplateEmailClientInjoinableService
        , private templateEmailMauvaisContactService: TemplateEmailMauvaisContactService
        , private templateEmailReplanificationService: TemplateEmailReplanificationService
        , private templateEmailFtlService: TemplateEmailFtlService
        , private templateEmailRefusService: TemplateEmailRefusService
        , private templateSuiviService: TemplateSuiviService
        , private templateEmailClientInjoinableKoscService: TemplateEmailClientInjoinableKoscService
        , private templateEmailClotureService: TemplateEmailClotureService
        , private templateEmailConfirmationClientService: TemplateEmailConfirmationClientService
        , private templateEmailPlanificationService: TemplateEmailPlanificationService
        , private templateEmailCriService: TemplateEmailCriService
    ) {

    }

    _submitted = false;

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }

    private _errorMessages = new Array<string>();

    get errorMessages(): string[] {
        return this._errorMessages;
    }

    set errorMessages(value: string[]) {
        this._errorMessages = value;
    }

    _validDefaultTemplateConfigurationEmailKosc = true;

    get validDefaultTemplateConfigurationEmailKosc(): boolean {
        return this._validDefaultTemplateConfigurationEmailKosc;
    }

    set validDefaultTemplateConfigurationEmailKosc(value: boolean) {
        this._validDefaultTemplateConfigurationEmailKosc = value;
    }

    _validDefaultTemplateConfigurationEmailManeo = true;

    get validDefaultTemplateConfigurationEmailManeo(): boolean {
        return this._validDefaultTemplateConfigurationEmailManeo;
    }

    set validDefaultTemplateConfigurationEmailManeo(value: boolean) {
        this._validDefaultTemplateConfigurationEmailManeo = value;
    }

    _validTemplateEmailFtlLibelle = true;

    get validTemplateEmailFtlLibelle(): boolean {
        return this._validTemplateEmailFtlLibelle;
    }

    set validTemplateEmailFtlLibelle(value: boolean) {
        this._validTemplateEmailFtlLibelle = value;
    }

    _validTemplateEmailFtlObjet = true;

    get validTemplateEmailFtlObjet(): boolean {
        return this._validTemplateEmailFtlObjet;
    }

    set validTemplateEmailFtlObjet(value: boolean) {
        this._validTemplateEmailFtlObjet = value;
    }

    _validTemplateEmailFtlCorps = true;

    get validTemplateEmailFtlCorps(): boolean {
        return this._validTemplateEmailFtlCorps;
    }

    set validTemplateEmailFtlCorps(value: boolean) {
        this._validTemplateEmailFtlCorps = value;
    }

    _validTemplateEmailClotureLibelle = true;

    get validTemplateEmailClotureLibelle(): boolean {
        return this._validTemplateEmailClotureLibelle;
    }

    set validTemplateEmailClotureLibelle(value: boolean) {
        this._validTemplateEmailClotureLibelle = value;
    }

    _validTemplateEmailClotureObjet = true;

    get validTemplateEmailClotureObjet(): boolean {
        return this._validTemplateEmailClotureObjet;
    }

    set validTemplateEmailClotureObjet(value: boolean) {
        this._validTemplateEmailClotureObjet = value;
    }

    _validTemplateEmailClotureCorps = true;

    get validTemplateEmailClotureCorps(): boolean {
        return this._validTemplateEmailClotureCorps;
    }

    set validTemplateEmailClotureCorps(value: boolean) {
        this._validTemplateEmailClotureCorps = value;
    }

    _validTemplateSuiviLibelle = true;

    get validTemplateSuiviLibelle(): boolean {
        return this._validTemplateSuiviLibelle;
    }

    set validTemplateSuiviLibelle(value: boolean) {
        this._validTemplateSuiviLibelle = value;
    }

    _validTemplateSuiviObjet = true;

    get validTemplateSuiviObjet(): boolean {
        return this._validTemplateSuiviObjet;
    }

    set validTemplateSuiviObjet(value: boolean) {
        this._validTemplateSuiviObjet = value;
    }

    _validTemplateSuiviCorps = true;

    get validTemplateSuiviCorps(): boolean {
        return this._validTemplateSuiviCorps;
    }

    set validTemplateSuiviCorps(value: boolean) {
        this._validTemplateSuiviCorps = value;
    }

    _validTemplateEmailClientInjoinableLibelle = true;

    get validTemplateEmailClientInjoinableLibelle(): boolean {
        return this._validTemplateEmailClientInjoinableLibelle;
    }

    set validTemplateEmailClientInjoinableLibelle(value: boolean) {
        this._validTemplateEmailClientInjoinableLibelle = value;
    }

    _validTemplateEmailClientInjoinableObjet = true;

    get validTemplateEmailClientInjoinableObjet(): boolean {
        return this._validTemplateEmailClientInjoinableObjet;
    }

    set validTemplateEmailClientInjoinableObjet(value: boolean) {
        this._validTemplateEmailClientInjoinableObjet = value;
    }

    _validTemplateEmailClientInjoinableCorps = true;

    get validTemplateEmailClientInjoinableCorps(): boolean {
        return this._validTemplateEmailClientInjoinableCorps;
    }

    set validTemplateEmailClientInjoinableCorps(value: boolean) {
        this._validTemplateEmailClientInjoinableCorps = value;
    }

    _validTemplateEmailReportLibelle = true;

    get validTemplateEmailReportLibelle(): boolean {
        return this._validTemplateEmailReportLibelle;
    }

    set validTemplateEmailReportLibelle(value: boolean) {
        this._validTemplateEmailReportLibelle = value;
    }

    _validTemplateEmailReportObjet = true;

    get validTemplateEmailReportObjet(): boolean {
        return this._validTemplateEmailReportObjet;
    }

    set validTemplateEmailReportObjet(value: boolean) {
        this._validTemplateEmailReportObjet = value;
    }

    _validTemplateEmailReportCorps = true;

    get validTemplateEmailReportCorps(): boolean {
        return this._validTemplateEmailReportCorps;
    }

    set validTemplateEmailReportCorps(value: boolean) {
        this._validTemplateEmailReportCorps = value;
    }

    _validTemplateEmailPlanificationLibelle = true;

    get validTemplateEmailPlanificationLibelle(): boolean {
        return this._validTemplateEmailPlanificationLibelle;
    }

// methods

    set validTemplateEmailPlanificationLibelle(value: boolean) {
        this._validTemplateEmailPlanificationLibelle = value;
    }

// getters and setters

    _validTemplateEmailPlanificationObjet = true;

    get validTemplateEmailPlanificationObjet(): boolean {
        return this._validTemplateEmailPlanificationObjet;
    }

    set validTemplateEmailPlanificationObjet(value: boolean) {
        this._validTemplateEmailPlanificationObjet = value;
    }

    _validTemplateEmailPlanificationCorps = true;

    get validTemplateEmailPlanificationCorps(): boolean {
        return this._validTemplateEmailPlanificationCorps;
    }

    set validTemplateEmailPlanificationCorps(value: boolean) {
        this._validTemplateEmailPlanificationCorps = value;
    }

    _validTemplateEmailReplanificationLibelle = true;

    get validTemplateEmailReplanificationLibelle(): boolean {
        return this._validTemplateEmailReplanificationLibelle;
    }

    set validTemplateEmailReplanificationLibelle(value: boolean) {
        this._validTemplateEmailReplanificationLibelle = value;
    }

    _validTemplateEmailReplanificationObjet = true;

    get validTemplateEmailReplanificationObjet(): boolean {
        return this._validTemplateEmailReplanificationObjet;
    }

    set validTemplateEmailReplanificationObjet(value: boolean) {
        this._validTemplateEmailReplanificationObjet = value;
    }

    _validTemplateEmailReplanificationCorps = true;

    get validTemplateEmailReplanificationCorps(): boolean {
        return this._validTemplateEmailReplanificationCorps;
    }

    set validTemplateEmailReplanificationCorps(value: boolean) {
        this._validTemplateEmailReplanificationCorps = value;
    }

    _validTemplateEmailRefusLibelle = true;

    get validTemplateEmailRefusLibelle(): boolean {
        return this._validTemplateEmailRefusLibelle;
    }

    set validTemplateEmailRefusLibelle(value: boolean) {
        this._validTemplateEmailRefusLibelle = value;
    }

    _validTemplateEmailRefusObjet = true;

    get validTemplateEmailRefusObjet(): boolean {
        return this._validTemplateEmailRefusObjet;
    }

    set validTemplateEmailRefusObjet(value: boolean) {
        this._validTemplateEmailRefusObjet = value;
    }

    _validTemplateEmailRefusCorps = true;

    get validTemplateEmailRefusCorps(): boolean {
        return this._validTemplateEmailRefusCorps;
    }

    set validTemplateEmailRefusCorps(value: boolean) {
        this._validTemplateEmailRefusCorps = value;
    }

    _validTemplateEmailClientInjoinableKoscLibelle = true;

    get validTemplateEmailClientInjoinableKoscLibelle(): boolean {
        return this._validTemplateEmailClientInjoinableKoscLibelle;
    }

    set validTemplateEmailClientInjoinableKoscLibelle(value: boolean) {
        this._validTemplateEmailClientInjoinableKoscLibelle = value;
    }

    _validTemplateEmailClientInjoinableKoscObjet = true;

    get validTemplateEmailClientInjoinableKoscObjet(): boolean {
        return this._validTemplateEmailClientInjoinableKoscObjet;
    }

    set validTemplateEmailClientInjoinableKoscObjet(value: boolean) {
        this._validTemplateEmailClientInjoinableKoscObjet = value;
    }

    _validTemplateEmailClientInjoinableKoscCorps = true;

    get validTemplateEmailClientInjoinableKoscCorps(): boolean {
        return this._validTemplateEmailClientInjoinableKoscCorps;
    }

    set validTemplateEmailClientInjoinableKoscCorps(value: boolean) {
        this._validTemplateEmailClientInjoinableKoscCorps = value;
    }

    _validTemplateEmailConfirmationClientLibelle = true;

    get validTemplateEmailConfirmationClientLibelle(): boolean {
        return this._validTemplateEmailConfirmationClientLibelle;
    }

    set validTemplateEmailConfirmationClientLibelle(value: boolean) {
        this._validTemplateEmailConfirmationClientLibelle = value;
    }

    _validTemplateEmailConfirmationClientObjet = true;

    get validTemplateEmailConfirmationClientObjet(): boolean {
        return this._validTemplateEmailConfirmationClientObjet;
    }

    set validTemplateEmailConfirmationClientObjet(value: boolean) {
        this._validTemplateEmailConfirmationClientObjet = value;
    }

    _validTemplateEmailConfirmationClientCorps = true;

    get validTemplateEmailConfirmationClientCorps(): boolean {
        return this._validTemplateEmailConfirmationClientCorps;
    }

    set validTemplateEmailConfirmationClientCorps(value: boolean) {
        this._validTemplateEmailConfirmationClientCorps = value;
    }

    _validTemplateEmailMauvaisContactLibelle = true;

    get validTemplateEmailMauvaisContactLibelle(): boolean {
        return this._validTemplateEmailMauvaisContactLibelle;
    }

    set validTemplateEmailMauvaisContactLibelle(value: boolean) {
        this._validTemplateEmailMauvaisContactLibelle = value;
    }

    _validTemplateEmailMauvaisContactObjet = true;

    get validTemplateEmailMauvaisContactObjet(): boolean {
        return this._validTemplateEmailMauvaisContactObjet;
    }

    set validTemplateEmailMauvaisContactObjet(value: boolean) {
        this._validTemplateEmailMauvaisContactObjet = value;
    }

    _validTemplateEmailMauvaisContactCorps = true;

    get validTemplateEmailMauvaisContactCorps(): boolean {
        return this._validTemplateEmailMauvaisContactCorps;
    }

    set validTemplateEmailMauvaisContactCorps(value: boolean) {
        this._validTemplateEmailMauvaisContactCorps = value;
    }

    _validTemplateEmailCriLibelle = true;

    get validTemplateEmailCriLibelle(): boolean {
        return this._validTemplateEmailCriLibelle;
    }

    set validTemplateEmailCriLibelle(value: boolean) {
        this._validTemplateEmailCriLibelle = value;
    }

    _validTemplateEmailCriObjet = true;

    get validTemplateEmailCriObjet(): boolean {
        return this._validTemplateEmailCriObjet;
    }

    set validTemplateEmailCriObjet(value: boolean) {
        this._validTemplateEmailCriObjet = value;
    }

    _validTemplateEmailCriCorps = true;

    get validTemplateEmailCriCorps(): boolean {
        return this._validTemplateEmailCriCorps;
    }

    set validTemplateEmailCriCorps(value: boolean) {
        this._validTemplateEmailCriCorps = value;
    }

    get defaultTemplateConfigurations(): Array<DefaultTemplateConfigurationVo> {
        return this.defaultTemplateConfigurationService.defaultTemplateConfigurations;
    }

    set defaultTemplateConfigurations(value: Array<DefaultTemplateConfigurationVo>) {
        this.defaultTemplateConfigurationService.defaultTemplateConfigurations = value;
    }

    get selectedDefaultTemplateConfiguration(): DefaultTemplateConfigurationVo {
        return this.defaultTemplateConfigurationService.selectedDefaultTemplateConfiguration;
    }

    set selectedDefaultTemplateConfiguration(value: DefaultTemplateConfigurationVo) {
        this.defaultTemplateConfigurationService.selectedDefaultTemplateConfiguration = value;
    }

    get editDefaultTemplateConfigurationDialog(): boolean {
        return this.defaultTemplateConfigurationService.editDefaultTemplateConfigurationDialog;

    }

    set editDefaultTemplateConfigurationDialog(value: boolean) {
        this.defaultTemplateConfigurationService.editDefaultTemplateConfigurationDialog = value;
    }

    get selectedTemplateEmailCri(): TemplateEmailCriVo {
        return this.templateEmailCriService.selectedTemplateEmailCri;
    }

    set selectedTemplateEmailCri(value: TemplateEmailCriVo) {
        this.templateEmailCriService.selectedTemplateEmailCri = value;
    }

    get templateEmailCris(): Array<TemplateEmailCriVo> {
        return this.templateEmailCriService.templateEmailCris;
    }

    set templateEmailCris(value: Array<TemplateEmailCriVo>) {
        this.templateEmailCriService.templateEmailCris = value;
    }

    get createTemplateEmailCriDialog(): boolean {
        return this.templateEmailCriService.createTemplateEmailCriDialog;
    }

    set createTemplateEmailCriDialog(value: boolean) {
        this.templateEmailCriService.createTemplateEmailCriDialog = value;
    }

    get selectedTemplateEmailFtl(): TemplateEmailFtlVo {
        return this.templateEmailFtlService.selectedTemplateEmailFtl;
    }

    set selectedTemplateEmailFtl(value: TemplateEmailFtlVo) {
        this.templateEmailFtlService.selectedTemplateEmailFtl = value;
    }

    get templateEmailFtls(): Array<TemplateEmailFtlVo> {
        return this.templateEmailFtlService.templateEmailFtls;
    }

    set templateEmailFtls(value: Array<TemplateEmailFtlVo>) {
        this.templateEmailFtlService.templateEmailFtls = value;
    }

    get createTemplateEmailFtlDialog(): boolean {
        return this.templateEmailFtlService.createTemplateEmailFtlDialog;
    }

    set createTemplateEmailFtlDialog(value: boolean) {
        this.templateEmailFtlService.createTemplateEmailFtlDialog = value;
    }

    get selectedTemplateEmailRefus(): TemplateEmailRefusVo {
        return this.templateEmailRefusService.selectedTemplateEmailRefus;
    }

    set selectedTemplateEmailRefus(value: TemplateEmailRefusVo) {
        this.templateEmailRefusService.selectedTemplateEmailRefus = value;
    }

    get templateEmailRefuss(): Array<TemplateEmailRefusVo> {
        return this.templateEmailRefusService.templateEmailRefuss;
    }

    set templateEmailRefuss(value: Array<TemplateEmailRefusVo>) {
        this.templateEmailRefusService.templateEmailRefuss = value;
    }

    get createTemplateEmailRefusDialog(): boolean {
        return this.templateEmailRefusService.createTemplateEmailRefusDialog;
    }

    set createTemplateEmailRefusDialog(value: boolean) {
        this.templateEmailRefusService.createTemplateEmailRefusDialog = value;
    }

    get selectedTemplateEmailPlanification(): TemplateEmailPlanificationVo {
        return this.templateEmailPlanificationService.selectedTemplateEmailPlanification;
    }

    set selectedTemplateEmailPlanification(value: TemplateEmailPlanificationVo) {
        this.templateEmailPlanificationService.selectedTemplateEmailPlanification = value;
    }

    get templateEmailPlanifications(): Array<TemplateEmailPlanificationVo> {
        return this.templateEmailPlanificationService.templateEmailPlanifications;
    }

    set templateEmailPlanifications(value: Array<TemplateEmailPlanificationVo>) {
        this.templateEmailPlanificationService.templateEmailPlanifications = value;
    }

    get createTemplateEmailPlanificationDialog(): boolean {
        return this.templateEmailPlanificationService.createTemplateEmailPlanificationDialog;
    }

    set createTemplateEmailPlanificationDialog(value: boolean) {
        this.templateEmailPlanificationService.createTemplateEmailPlanificationDialog = value;
    }

    get selectedTemplateEmailClientInjoinable(): TemplateEmailClientInjoinableVo {
        return this.templateEmailClientInjoinableService.selectedTemplateEmailClientInjoinable;
    }

    set selectedTemplateEmailClientInjoinable(value: TemplateEmailClientInjoinableVo) {
        this.templateEmailClientInjoinableService.selectedTemplateEmailClientInjoinable = value;
    }

    get templateEmailClientInjoinables(): Array<TemplateEmailClientInjoinableVo> {
        return this.templateEmailClientInjoinableService.templateEmailClientInjoinables;
    }

    set templateEmailClientInjoinables(value: Array<TemplateEmailClientInjoinableVo>) {
        this.templateEmailClientInjoinableService.templateEmailClientInjoinables = value;
    }

    get createTemplateEmailClientInjoinableDialog(): boolean {
        return this.templateEmailClientInjoinableService.createTemplateEmailClientInjoinableDialog;
    }

    set createTemplateEmailClientInjoinableDialog(value: boolean) {
        this.templateEmailClientInjoinableService.createTemplateEmailClientInjoinableDialog = value;
    }

    get selectedTemplateEmailCloture(): TemplateEmailClotureVo {
        return this.templateEmailClotureService.selectedTemplateEmailCloture;
    }

    set selectedTemplateEmailCloture(value: TemplateEmailClotureVo) {
        this.templateEmailClotureService.selectedTemplateEmailCloture = value;
    }

    get templateEmailClotures(): Array<TemplateEmailClotureVo> {
        return this.templateEmailClotureService.templateEmailClotures;
    }

    set templateEmailClotures(value: Array<TemplateEmailClotureVo>) {
        this.templateEmailClotureService.templateEmailClotures = value;
    }

    get createTemplateEmailClotureDialog(): boolean {
        return this.templateEmailClotureService.createTemplateEmailClotureDialog;
    }

    set createTemplateEmailClotureDialog(value: boolean) {
        this.templateEmailClotureService.createTemplateEmailClotureDialog = value;
    }




    get selectedTemplateEmailReplanification(): TemplateEmailReplanificationVo {
        return this.templateEmailReplanificationService.selectedTemplateEmailReplanification;
    }

    set selectedTemplateEmailReplanification(value: TemplateEmailReplanificationVo) {
        this.templateEmailReplanificationService.selectedTemplateEmailReplanification = value;
    }

    get templateEmailReplanifications(): Array<TemplateEmailReplanificationVo> {
        return this.templateEmailReplanificationService.templateEmailReplanifications;
    }

    set templateEmailReplanifications(value: Array<TemplateEmailReplanificationVo>) {
        this.templateEmailReplanificationService.templateEmailReplanifications = value;
    }

    get createTemplateEmailReplanificationDialog(): boolean {
        return this.templateEmailReplanificationService.createTemplateEmailReplanificationDialog;
    }

    set createTemplateEmailReplanificationDialog(value: boolean) {
        this.templateEmailReplanificationService.createTemplateEmailReplanificationDialog = value;
    }

    get selectedTemplateEmailMauvaisContact(): TemplateEmailMauvaisContactVo {
        return this.templateEmailMauvaisContactService.selectedTemplateEmailMauvaisContact;
    }

    set selectedTemplateEmailMauvaisContact(value: TemplateEmailMauvaisContactVo) {
        this.templateEmailMauvaisContactService.selectedTemplateEmailMauvaisContact = value;
    }

    get templateEmailMauvaisContacts(): Array<TemplateEmailMauvaisContactVo> {
        return this.templateEmailMauvaisContactService.templateEmailMauvaisContacts;
    }

    set templateEmailMauvaisContacts(value: Array<TemplateEmailMauvaisContactVo>) {
        this.templateEmailMauvaisContactService.templateEmailMauvaisContacts = value;
    }

    get createTemplateEmailMauvaisContactDialog(): boolean {
        return this.templateEmailMauvaisContactService.createTemplateEmailMauvaisContactDialog;
    }

    set createTemplateEmailMauvaisContactDialog(value: boolean) {
        this.templateEmailMauvaisContactService.createTemplateEmailMauvaisContactDialog = value;
    }

    get selectedTemplateSuivi(): TemplateSuiviVo {
        return this.templateSuiviService.selectedTemplateSuivi;
    }

    set selectedTemplateSuivi(value: TemplateSuiviVo) {
        this.templateSuiviService.selectedTemplateSuivi = value;
    }

    get templateSuivis(): Array<TemplateSuiviVo> {
        return this.templateSuiviService.templateSuivis;
    }

    set templateSuivis(value: Array<TemplateSuiviVo>) {
        this.templateSuiviService.templateSuivis = value;
    }

    get createTemplateSuiviDialog(): boolean {
        return this.templateSuiviService.createTemplateSuiviDialog;
    }

    set createTemplateSuiviDialog(value: boolean) {
        this.templateSuiviService.createTemplateSuiviDialog = value;
    }

    get selectedTemplateEmailConfirmationClient(): TemplateEmailConfirmationClientVo {
        return this.templateEmailConfirmationClientService.selectedTemplateEmailConfirmationClient;
    }

    set selectedTemplateEmailConfirmationClient(value: TemplateEmailConfirmationClientVo) {
        this.templateEmailConfirmationClientService.selectedTemplateEmailConfirmationClient = value;
    }

    get templateEmailConfirmationClients(): Array<TemplateEmailConfirmationClientVo> {
        return this.templateEmailConfirmationClientService.templateEmailConfirmationClients;
    }

    set templateEmailConfirmationClients(value: Array<TemplateEmailConfirmationClientVo>) {
        this.templateEmailConfirmationClientService.templateEmailConfirmationClients = value;
    }

    get createTemplateEmailConfirmationClientDialog(): boolean {
        return this.templateEmailConfirmationClientService.createTemplateEmailConfirmationClientDialog;
    }

    set createTemplateEmailConfirmationClientDialog(value: boolean) {
        this.templateEmailConfirmationClientService.createTemplateEmailConfirmationClientDialog = value;
    }

    get selectedTemplateEmailClientInjoinableKosc(): TemplateEmailClientInjoinableKoscVo {
        return this.templateEmailClientInjoinableKoscService.selectedTemplateEmailClientInjoinableKosc;
    }

    set selectedTemplateEmailClientInjoinableKosc(value: TemplateEmailClientInjoinableKoscVo) {
        this.templateEmailClientInjoinableKoscService.selectedTemplateEmailClientInjoinableKosc = value;
    }

    get templateEmailClientInjoinableKoscs(): Array<TemplateEmailClientInjoinableKoscVo> {
        return this.templateEmailClientInjoinableKoscService.templateEmailClientInjoinableKoscs;
    }

    set templateEmailClientInjoinableKoscs(value: Array<TemplateEmailClientInjoinableKoscVo>) {
        this.templateEmailClientInjoinableKoscService.templateEmailClientInjoinableKoscs = value;
    }

    get createTemplateEmailClientInjoinableKoscDialog(): boolean {
        return this.templateEmailClientInjoinableKoscService.createTemplateEmailClientInjoinableKoscDialog;
    }

    set createTemplateEmailClientInjoinableKoscDialog(value: boolean) {
        this.templateEmailClientInjoinableKoscService.createTemplateEmailClientInjoinableKoscDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatEdit;
    }

    get dateFormatColumn() {
        return environment.dateFormatEdit;
    }

// methods
    ngOnInit(): void {

        this.selectedTemplateEmailFtl = new TemplateEmailFtlVo();
        this.templateEmailFtlService.findAll().subscribe((data) => this.templateEmailFtls = data);
        this.selectedTemplateEmailCloture = new TemplateEmailClotureVo();
        this.templateEmailClotureService.findAll().subscribe((data) => this.templateEmailClotures = data);
        this.selectedTemplateSuivi = new TemplateSuiviVo();
        this.templateSuiviService.findAll().subscribe((data) => this.templateSuivis = data);
        this.selectedTemplateEmailClientInjoinable = new TemplateEmailClientInjoinableVo();
        this.templateEmailClientInjoinableService.findAll().subscribe((data) => this.templateEmailClientInjoinables = data);
        this.selectedTemplateEmailPlanification = new TemplateEmailPlanificationVo();
        this.templateEmailPlanificationService.findAll().subscribe((data) => this.templateEmailPlanifications = data);
        this.selectedTemplateEmailReplanification = new TemplateEmailReplanificationVo();
        this.templateEmailReplanificationService.findAll().subscribe((data) => this.templateEmailReplanifications = data);
        this.selectedTemplateEmailRefus = new TemplateEmailRefusVo();
        this.templateEmailRefusService.findAll().subscribe((data) => this.templateEmailRefuss = data);
        this.selectedTemplateEmailClientInjoinableKosc = new TemplateEmailClientInjoinableKoscVo();
        this.templateEmailClientInjoinableKoscService.findAll().subscribe((data) => this.templateEmailClientInjoinableKoscs = data);
        this.selectedTemplateEmailConfirmationClient = new TemplateEmailConfirmationClientVo();
        this.templateEmailConfirmationClientService.findAll().subscribe((data) => this.templateEmailConfirmationClients = data);
        this.selectedTemplateEmailMauvaisContact = new TemplateEmailMauvaisContactVo();
        this.templateEmailMauvaisContactService.findAll().subscribe((data) => this.templateEmailMauvaisContacts = data);
        this.selectedTemplateEmailCri = new TemplateEmailCriVo();
        this.templateEmailCriService.findAll().subscribe((data) => this.templateEmailCris = data);
    }

    public edit() {
        this.submitted = true;
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.editWithShowOption(false);
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Errors',
                detail: 'Thank you for correcting errors on the form'
            });
        }
    }

    public editWithShowOption(showList: boolean) {
        this.defaultTemplateConfigurationService.edit().subscribe(defaultTemplateConfiguration => {
            const myIndex = this.defaultTemplateConfigurations.findIndex(e => e.id === this.selectedDefaultTemplateConfiguration.id);
            this.defaultTemplateConfigurations[myIndex] = defaultTemplateConfiguration;
            this.editDefaultTemplateConfigurationDialog = false;
            this.submitted = false;
            this.selectedDefaultTemplateConfiguration = new DefaultTemplateConfigurationVo();


        }, error => {
            console.log(error);
        });

    }

//openPopup
    public async openCreateTemplateEmailCri(templateEmailCri: string) {
        const isPermistted = await this.roleService.isPermitted('TemplateEmailCri', 'edit');
        if (isPermistted) {
            this.selectedTemplateEmailCri = new TemplateEmailCriVo();
            this.createTemplateEmailCriDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'error', detail: 'permission problem'
            });
        }
    }

    public async openCreateTemplateEmailFtl(templateEmailFtl: string) {
        const isPermistted = await this.roleService.isPermitted('TemplateEmailFtl', 'edit');
        if (isPermistted) {
            this.selectedTemplateEmailFtl = new TemplateEmailFtlVo();
            this.createTemplateEmailFtlDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'error', detail: 'permission problem'
            });
        }
    }

    public async openCreateTemplateEmailRefus(templateEmailRefus: string) {
        const isPermistted = await this.roleService.isPermitted('TemplateEmailRefus', 'edit');
        if (isPermistted) {
            this.selectedTemplateEmailRefus = new TemplateEmailRefusVo();
            this.createTemplateEmailRefusDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'error', detail: 'permission problem'
            });
        }
    }

    public async openCreateTemplateEmailPlanification(templateEmailPlanification: string) {
        const isPermistted = await this.roleService.isPermitted('TemplateEmailPlanification', 'edit');
        if (isPermistted) {
            this.selectedTemplateEmailPlanification = new TemplateEmailPlanificationVo();
            this.createTemplateEmailPlanificationDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'error', detail: 'permission problem'
            });
        }
    }

    public async openCreateTemplateEmailClientInjoinable(templateEmailClientInjoinable: string) {
        const isPermistted = await this.roleService.isPermitted('TemplateEmailClientInjoinable', 'edit');
        if (isPermistted) {
            this.selectedTemplateEmailClientInjoinable = new TemplateEmailClientInjoinableVo();
            this.createTemplateEmailClientInjoinableDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'error', detail: 'permission problem'
            });
        }
    }

    public async openCreateTemplateEmailCloture(templateEmailCloture: string) {
        const isPermistted = await this.roleService.isPermitted('TemplateEmailCloture', 'edit');
        if (isPermistted) {
            this.selectedTemplateEmailCloture = new TemplateEmailClotureVo();
            this.createTemplateEmailClotureDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'error', detail: 'permission problem'
            });
        }
    }



    public async openCreateTemplateEmailReplanification(templateEmailReplanification: string) {
        const isPermistted = await this.roleService.isPermitted('TemplateEmailReplanification', 'edit');
        if (isPermistted) {
            this.selectedTemplateEmailReplanification = new TemplateEmailReplanificationVo();
            this.createTemplateEmailReplanificationDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'error', detail: 'permission problem'
            });
        }
    }

    public async openCreateTemplateEmailMauvaisContact(templateEmailMauvaisContact: string) {
        const isPermistted = await this.roleService.isPermitted('TemplateEmailMauvaisContact', 'edit');
        if (isPermistted) {
            this.selectedTemplateEmailMauvaisContact = new TemplateEmailMauvaisContactVo();
            this.createTemplateEmailMauvaisContactDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'error', detail: 'permission problem'
            });
        }
    }

    public async openCreateTemplateSuivi(templateSuivi: string) {
        const isPermistted = await this.roleService.isPermitted('TemplateSuivi', 'edit');
        if (isPermistted) {
            this.selectedTemplateSuivi = new TemplateSuiviVo();
            this.createTemplateSuiviDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'error', detail: 'permission problem'
            });
        }
    }

    public async openCreateTemplateEmailConfirmationClient(templateEmailConfirmationClient: string) {
        const isPermistted = await this.roleService.isPermitted('TemplateEmailConfirmationClient', 'edit');
        if (isPermistted) {
            this.selectedTemplateEmailConfirmationClient = new TemplateEmailConfirmationClientVo();
            this.createTemplateEmailConfirmationClientDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'error', detail: 'permission problem'
            });
        }
    }

    public async openCreateTemplateEmailClientInjoinableKosc(templateEmailClientInjoinableKosc: string) {
        const isPermistted = await this.roleService.isPermitted('TemplateEmailClientInjoinableKosc', 'edit');
        if (isPermistted) {
            this.selectedTemplateEmailClientInjoinableKosc = new TemplateEmailClientInjoinableKoscVo();
            this.createTemplateEmailClientInjoinableKoscDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'error', detail: 'permission problem'
            });
        }
    }

    hideEditDialog() {
        this.editDefaultTemplateConfigurationDialog = false;
        this.setValidation(true);
    }

    private setValidation(value: boolean) {
        this.validDefaultTemplateConfigurationEmailKosc = value;
        this.validDefaultTemplateConfigurationEmailManeo = value;
    }

//validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateDefaultTemplateConfigurationEmailKosc();
        this.validateDefaultTemplateConfigurationEmailManeo();

    }

    private validateDefaultTemplateConfigurationEmailKosc() {
        if (this.stringUtilService.isEmpty(this.selectedDefaultTemplateConfiguration.emailKosc)) {
            this.errorMessages.push('Email kosc not valid');
            this.validDefaultTemplateConfigurationEmailKosc = false;
        } else {
            this.validDefaultTemplateConfigurationEmailKosc = true;
        }
    }

    private validateDefaultTemplateConfigurationEmailManeo() {
        if (this.stringUtilService.isEmpty(this.selectedDefaultTemplateConfiguration.emailManeo)) {
            this.errorMessages.push('Email maneo not valid');
            this.validDefaultTemplateConfigurationEmailManeo = false;
        } else {
            this.validDefaultTemplateConfigurationEmailManeo = true;
        }
    }
}
