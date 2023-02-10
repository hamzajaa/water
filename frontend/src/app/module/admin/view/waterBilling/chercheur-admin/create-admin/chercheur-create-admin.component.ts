import {Component, OnInit} from '@angular/core';
import {ChercheurService} from 'src/app/controller/service/Chercheur.service';
import {ChercheurVo} from 'src/app/controller/model/Chercheur.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
    selector: 'app-chercheur-create-admin',
    templateUrl: './chercheur-create-admin.component.html',
    styleUrls: ['./chercheur-create-admin.component.css']
})
export class ChercheurCreateAdminComponent implements OnInit {

    constructor(private datePipe: DatePipe, private chercheurService: ChercheurService
        , private stringUtilService: StringUtilService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
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

    get chercheurs(): Array<ChercheurVo> {
        return this.chercheurService.chercheurs;
    }

    set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
    }

    get selectedChercheur(): ChercheurVo {
        return this.chercheurService.selectedChercheur;
    }

    set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
    }

    get createChercheurDialog(): boolean {
        return this.chercheurService.createChercheurDialog;

    }

    set createChercheurDialog(value: boolean) {
        this.chercheurService.createChercheurDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatCreate;
    }

    get dateFormatColumn() {
        return environment.dateFormatCreate;
    }

    ngOnInit(): void {

    }

    public save() {
        this.submitted = true;
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.saveWithShowOption(false);
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Errors',
                detail: 'Thank you for correcting errors on the form'
            });
        }
    }

    public saveWithShowOption(showList: boolean) {
        this.chercheurService.save().subscribe(chercheur => {
            if (chercheur != null) {
                this.chercheurs.push({...chercheur});
                this.createChercheurDialog = false;
                this.submitted = false;
                this.selectedChercheur = new ChercheurVo();

            } else {
                this.messageService.add({severity: 'error', summary: 'Errors', detail: 'Chercheur already exist'});
            }

        }, error => {
            console.log(error);
        });
    }

    hideCreateDialog() {
        this.createChercheurDialog = false;
        this.setValidation(true);
    }

    private setValidation(value: boolean) {
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();

    }


}
