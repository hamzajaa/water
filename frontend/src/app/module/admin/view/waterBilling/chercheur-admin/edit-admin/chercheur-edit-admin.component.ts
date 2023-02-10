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
    selector: 'app-chercheur-edit-admin',
    templateUrl: './chercheur-edit-admin.component.html',
    styleUrls: ['./chercheur-edit-admin.component.css']
})
export class ChercheurEditAdminComponent implements OnInit {

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


//openPopup
// methods

    set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
    }

// getters and setters

    get selectedChercheur(): ChercheurVo {
        return this.chercheurService.selectedChercheur;
    }

    set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
    }

    get editChercheurDialog(): boolean {
        return this.chercheurService.editChercheurDialog;

    }

    set editChercheurDialog(value: boolean) {
        this.chercheurService.editChercheurDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatEdit;
    }

    get dateFormatColumn() {
        return environment.dateFormatEdit;
    }

// methods
    ngOnInit(): void {

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
        this.chercheurService.edit().subscribe(chercheur => {
            const myIndex = this.chercheurs.findIndex(e => e.id === this.selectedChercheur.id);
            this.chercheurs[myIndex] = chercheur;
            this.editChercheurDialog = false;
            this.submitted = false;
            this.selectedChercheur = new ChercheurVo();


        }, error => {
            console.log(error);
        });

    }

    hideEditDialog() {
        this.editChercheurDialog = false;
        this.setValidation(true);
    }

    private setValidation(value: boolean) {
    }

//validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();

    }


}
