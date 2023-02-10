import {Component, OnInit} from '@angular/core';
import {ChercheurService} from 'src/app/controller/service/Chercheur.service';
import {ChercheurVo} from 'src/app/controller/model/Chercheur.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-chercheur-view-admin',
    templateUrl: './chercheur-view-admin.component.html',
    styleUrls: ['./chercheur-view-admin.component.css']
})
export class ChercheurViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private chercheurService: ChercheurService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {
    }

    get chercheurs(): Array<ChercheurVo> {
        return this.chercheurService.chercheurs;
    }

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

    get viewChercheurDialog(): boolean {
        return this.chercheurService.viewChercheurDialog;

    }

    set viewChercheurDialog(value: boolean) {
        this.chercheurService.viewChercheurDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }

// methods
    ngOnInit(): void {
    }

    hideViewDialog() {
        this.viewChercheurDialog = false;
    }
}
