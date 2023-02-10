import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, MenuItem, Message, MessageService} from 'primeng/api';
import {Table} from "primeng/table";
import {User} from "../../../../../../controller/model/User.model";
import {UserService} from "../../../../../../controller/service/user.service";
import {Router} from "@angular/router";
import {DateUtils} from "../../../../../../utils/DateUtils";
import {DatePipe} from "@angular/common";
import {RoleService} from "../../../../../../controller/service/role.service";
import {ChercheurVo} from "../../../../../../controller/model/Chercheur.model";
import {ExportService} from "../../../../../../controller/service/Export.service";
import autoTable from "jspdf-autotable";
import {TokenService} from "../../../../../../controller/service/Token.service";
import {environment} from "../../../../../../../environments/environment";
import jsPDF from "jspdf";

@Component({
    selector: 'app-user-app-list',
    templateUrl: './user-app-list.component.html',
    styleUrls: ['./user-app-list.component.scss']
})
export class UserAppListComponent implements OnInit {

    roleChercheur: string = 'Chercheur';

    // declarations
    findByCriteriaShow = false;
    criteriaData: any[] = [];
    cols: any[] = [];

    excelPdfButons: MenuItem[];
    userButtons: MenuItem[];

    // users: User[];
    // Permet de choisir quelle vue on souhaite (carte ou lignes)
    isCardDisplayActivated = true;
    exportData: any[] = [];
    fileName = 'Utilisateurs';
    chargement = false;
    chargementTermine = false;
    chargementFailed = false;
    msgsSuccessImport: Message[];
    msgsFailedImport: Message[];
    btnChargementDisabled = false;

    // Contient une liste de chercheurs mise à plat.
    flatChercheurs: FlatChercheurs[] = [];


    yesOrNoFormationEnManagement: any[] = [];
    yesOrNoCredentialsNonExpired: any[] = [];
    yesOrNoEnabled: any[] = [];
    adminOrChercheurOrPilot: any[] = [];
    yesOrNoAccountNonExpired: any[] = [];
    yesOrNoAccountNonLocked: any[] = [];
    yesOrNoPasswordChanged: any[] = [];

    yesOrNoAdministrateur: any[] = [];
    yesOrNoPilot: any[] = [];
    yesOrNoChercheur: any[] = [];
    yesOrNoArchive: any[] = [];

    @ViewChild('dt')
    tableChercheur: Table;


    constructor( private messageService: MessageService,
                  private confirmationService: ConfirmationService,
                  private roleService: RoleService,
                  private router: Router,
                  private userService: UserService,
                  private tokenService: TokenService,
                  private exportService: ExportService,
                  private datePipe: DatePipe
    ) {
    }

    sortByColumnName($event: any, gridObject: Table) {
        const columnToSort = gridObject.columns.find(col => col.field === $event.field);
        gridObject.sortField = columnToSort.field;
        gridObject.sortOrder = $event.order ? 1 : -1;
        gridObject.sortSingle();
    }


    /**
     * Construit une copie de liste de chercheurs avec les champs profonds mis à plat
     */
    /*buildFlatChercheurs() {
        this.flatChercheurs = this.chercheurs.map(chercheur => new FlatChercheurs(chercheur));
        return this.flatChercheurs;
    }

    buildFlatusers() {
        this.flatChercheurs = this.chercheurs.map(chercheur => new FlatChercheurs(chercheur));
        return this.flatChercheurs;
    }*/

    ngOnInit(): void {
        this.findAll();
        this.initYesOrNo();
        this.initExport();
        this.initCol();

    }

    private initYesOrNo(): void {

        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
        this.yesOrNoPilot = [{label: 'Pilot', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
        this.yesOrNoAdministrateur = [{label: 'Administrateur', value: null}, {label: 'Oui', value: 1}, {
            label: 'Non',
            value: 0
        }];
        this.yesOrNoChercheur = [{label: 'Chercheur', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];

        this.yesOrNoFormationEnManagement = [{label: 'Formation en management', value: null}, {
            label: 'Oui',
            value: 1
        }, {
            label: 'Non',
            value: 0
        }];
        this.yesOrNoCredentialsNonExpired = [{label: 'Identifiants non expirés', value: null}, {
            label: 'Oui',
            value: 1
        }, {
            label: 'Non',
            value: 0
        }];
        this.yesOrNoEnabled = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];

        this.adminOrChercheurOrPilot = [{label: '--Role--', value: null},
            {label: 'Admin', value: 'Admin'},
            {label: 'Chercheur', value: 'Chercheur'},
            {label: 'Pilot', value: 'Pilot'}]

        this.yesOrNoAccountNonExpired = [{label: 'Comptes non expirés', value: null},
            {label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
        this.yesOrNoAccountNonLocked = [{label: 'Comptes non vérouillés', value: null},
            {label: 'Oui', value: 1},
            {label: 'Non', value: 0}];
        this.yesOrNoPasswordChanged = [{label: 'Mots de passes changés', value: null},
            {label: 'Oui', value: 1},
            {
                label: 'Non', value: 0
            }];
    }

    // methods
/* public async loadChercheurs() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Chercheur', 'list');
        isPermistted ? this.chercheurService.findAllUser().subscribe(data => {
                this.users = data;
                this.buildFlatChercheurs();
            }, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'error', detail: 'permission problem'});
    }*/

    // validateEmailAdress(email: string): boolean {
    //   var regex = /[a-zA-Z0-9_.+-]+@ird\.fr/
    //   return regex.test(email);
    // }

    get users(): Array<User> {
        return this.userService.users;
    }

    set users(value: Array<User>) {
        this.userService.users = value;
    }

    get user(): User {
        return this.userService.user;
    }

    set user(value: User) {
        this.userService.user = value;
    }

   /* public searchRequest() {
        this.userService.findByCriteria(this.searchChercheur).subscribe(data => {
            this.users = data;
            console.log('data: ' + data);
            this.buildFlatChercheurs();
            this.tableChercheur.first = 0;
        }, error => console.log(error));
    }*/

    private initCol() {
        this.cols = [
            {field: 'numeroMatricule', header: 'Numéro matricule'},
            {field: 'email', header: 'Email'},
            {field: 'typeEntiteAdministrative?.libelle', header: 'Type entité administrative'},
            {field: 'entiteAdministrative?.libelle', header: 'Entité administrative'},
            {field: 'pays', header: 'Pays'},
            {field: 'ville', header: 'Ville'},
            {field: 'departementScientifique?.libelle', header: 'Département scientifique'},
            {field: 'commissionScientifique?.libelle', header: 'Commission scientifique'},
            {field: 'grade?.libelle', header: 'Grade'},
            {field: 'corps?.libelle', header: 'Corps'},
            {field: 'sexe?.libelle', header: 'Sexe'},
            {field: 'natureImplication', header: 'Nature implication'},
            {field: 'resume', header: 'Resume'},
            {field: 'formationEnManagement', header: 'Formation en management'},
            {field: 'credentialsNonExpired', header: 'Credentials non expired'},
            {field: 'enabled', header: 'Enabled'},
            {field: 'createdAt', header: 'Crée le'},
            {field: 'updatedAt', header: 'Mis-à-jour le'},
            {field: 'accountNonExpired', header: 'Compte non expiré'},
            {field: 'accountNonLocked', header: 'Compte non vérouillé'},
            {field: 'username', header: 'Nom d\'utilisateur'},
            {field: 'password', header: 'Mot de passe'},
            {field: 'prenom', header: 'Prénom'},
            {field: 'nom', header: 'Nom'},
            {field: 'role', header: 'Role'},
            {field: 'passwordChanged', header: 'Mot de passe changé'},
        ];
    }


    toView(user: User) {
        this.viewUser(user);
    }

    toEdit(user: User) {
        this.edit(user);
    }


    /*public async deleteChercheur(user: User) {
        const isPermistted = await this.roleService.isPermitted('Chercheur', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez vous supprimez l\'Utilisateur ' + user.username + ' ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.chercheurService.delete(user.id).subscribe(res => {
                        console.log('haaa res de delete ==> '+res);
                        if (res > 0) {
                            this.users = this.users.filter(selectedUser => selectedUser.id != user.id);
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'Chercheur supprimé ',
                                life: 3000
                            });
                        } else if (res == -2) {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'error',
                                detail: 'l\'Utilisateur est importé et ne peut pas etre suprimé'
                            });
                        } else if (res == -3) {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'error',
                                detail: 'Cet utilisateur est considéré comme déclarant, il ne peut donc pas être supprimé, vous pouvez modifier son rôle pour le supprimer'
                            });

                        } else if (res == -4) {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'error',
                                detail: 'l\'Utilisateur  participe à des compagnes et ne peut pas etre suprimé'
                            });
                        }
                    }, error => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'error',
                            detail: 'Errors inatendue lors de la suppression de l\'utilisateur'
                        });
                    });
                }
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'error', detail: 'permission problem'
            });
        }
    }*/



    deleteUser(user: User) {
        const tokenDecoded = this.tokenService.decode();
        const username = tokenDecoded.sub;
        if (username == user.username) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Vous ne pouvez pas suprimer ' + username + ' car c\'est l\'Utilisateur courant',
                life: 3000
            })
        } else {
            this.confirmationService.confirm({
                message: 'Voulez vous supprimez l\'Utilisateur ' + user.username + ' ?',
                header: 'Confirmer',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.userService.delete(user.id);
                }
            });
        }
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

    get userEditDialog(): boolean {
        return this.userService.userEditDialog;
    }

    set userEditDialog(userEditDialog: boolean) {
        this.userService.userEditDialog = userEditDialog;
    }

    get userCreateDialog(): boolean {
        return this.userService.userCreateDialog;
    }

    set userCreateDialog(userCreateDialog: boolean) {
        this.userService.userCreateDialog = userCreateDialog;
    }


     openCreateDialog() {
        this.userDialogTitle = 'Ajouter un utilisateur';
        this.userCreateDialog = true;
        this.user = new User();
    }


    exportExcel(): void {
        import('xlsx').then(async xlsx => {
            this.prepareColumnExport();
            const worksheet = xlsx.utils.json_to_sheet(this.exportData);
            const workbook = {Sheets: {data: worksheet}, SheetNames: ['data']};
            const excelBuffer: any = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
            this.saveAsExcelFile(excelBuffer, this.fileName);
        });
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        import('file-saver').then(FileSaver => {
            const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
            FileSaver.saveAs(data, fileName + '.xlsx');
        });
    }

    exportPdf(): void {
        this.prepareColumnExport();
        const doc = new jsPDF('landscape');
        autoTable(doc, {
            columns: [
                {header: 'Numero matricule', dataKey: 'Numero matricule'},
                {header: 'Email', dataKey: 'Email'},
                {header: 'Type entite administrative', dataKey: 'Type entite administrative'},
                {header: 'Entite administrative', dataKey: 'Entite administrative'},
                {header: 'Pays', dataKey: 'Pays'},
                {header: 'Ville', dataKey: 'Ville'},
                {header: 'Departement scientifique', dataKey: 'Departement scientifique'},
                {header: 'Commission scientifique', dataKey: 'Commission scientifique'},
                {header: 'Grade', dataKey: 'Grade'},
                {header: 'Corps', dataKey: 'Corps'},
                {header: 'Sexe', dataKey: 'Sexe'},
                {header: 'Nature implication', dataKey: 'Nature implication'},
                {header: 'Resume', dataKey: 'Resume'},
                {header: 'Formation en management', dataKey: 'Formation en management'},
                {header: 'Credentials non expired', dataKey: 'Credentials non expired'},
                {header: 'Enabled', dataKey: 'Enabled'},
                {header: 'Created at', dataKey: 'Created at'},
                {header: 'Updated at', dataKey: 'Updated at'},
                {header: 'Account non expired', dataKey: 'Account non expired'},
                {header: 'Account non locked', dataKey: 'Account non locked'},
                {header: 'Username', dataKey: 'Username'},
                {header: 'Password', dataKey: 'Password'},
                {header: 'Prenom', dataKey: 'Prenom'},
                {header: 'Nom', dataKey: 'Nom'},
                {header: 'Role', dataKey: 'Role'},
                {header: 'Password changed', dataKey: 'Password changed'},
            ],
            body: this.exportData, styles: {fontSize: 5}
        });
        doc.save(this.fileName + '.pdf');
    }

    saveAs(blob: Blob, s: string) {

    }

    // exportCSV() {
    //   this.prepareColumnExport();
    //   const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    //   const header = Object.keys(this.exportData[0]);
    //   const csv = this.exportData.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(';'));
    //   csv.unshift(header.join(';'));
    //   const csvArray = csv.join('\r\n');
    //   const blob = new Blob([csvArray], {type: 'text/csv'});
    //   this.saveAs(blob, this.fileName + '.csv');
    // }

    prepareColumnExport(): void {
        this.exportData = this.users.map(e => {
            return {
                'Email': e.email,
                'Prenom': e.prenom,
                'Nom usage': e.nom,
            };
        });

        /*this.criteriaData = [{
            'Email': this.searchChercheur.email ? this.searchChercheur.email : environment.emptyForExport,
            'Prenom': this.searchChercheur.prenom ? this.searchChercheur.prenom : environment.emptyForExport,
            'Nom usage': this.searchChercheur.nom ? this.searchChercheur.nom : environment.emptyForExport,
            'Nom naissance': this.searchChercheur.nomNaissance ? this.searchChercheur.nomNaissance : environment.emptyForExport,
            'Numero matricule': this.searchChercheur.numeroMatricule ? this.searchChercheur.numeroMatricule : environment.emptyForExport,
            'Role': this.searchChercheur.role ? this.searchChercheur.role : environment.emptyForExport,
            'Archive': this.searchChercheur.archive ? (this.searchChercheur.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchChercheur.dateArchivageMin ? this.datePipe.transform(this.searchChercheur.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchChercheur.dateArchivageMax ? this.datePipe.transform(this.searchChercheur.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
        }];*/


    }


// getters and setters

   get selectedUser(){
   return this.userService.user
}
    set selectedUser(user:User){
         this.userService.user=user;
    }

    get userDialogTitle(): string {
        return this.userService.userDialogTitle;
    }

    set userDialogTitle(value: string) {
        this.userService.userDialogTitle = value;
    }




    get dateFormat() {
        return environment.dateFormatList;
    }

   /* importFromGraphql() {
        this.chargement = true;
        this.chargementTermine = false;
        this.chargementFailed = false;
        this.btnChargementDisabled = true;
        this.chercheurService.importFromGraphql().subscribe(response => {
            console.log(response);
            this.chargementTermine = true;
            console.log('chercheurs is being loaded');
            this.loadChercheurs();
            this.msgsSuccessImport = [
                {
                    severity: 'success',
                    closable: false,
                    summary: 'Success',
                    detail: 'Nombre des chercheurs ajoutés: ' + this.importChercheurVO?.nbAdded
                },
                {
                    severity: 'success',
                    closable: false,
                    summary: 'Success',
                    detail: 'Nombre des chercheurs modifiés: ' + this.importChercheurVO?.nbmodified
                },
            ];
            this.btnChargementDisabled = false;
        }, error => {
            console.log(error);
            this.msgsFailedImport = [
                {
                    severity: 'error',
                    closable: false,
                    summary: 'Error',
                    detail: 'Une error est survenue lors de l\'importation des chercheurs merci de ressayer'
                },
            ];
            this.chargementFailed = true;
            this.btnChargementDisabled = false;
        });
    }*/
    checked: boolean;

    get submitted(): boolean {
        return this.userService.submitted;
    }

    set submitted(submitted: boolean) {
        this.userService.submitted = submitted;
    }

    get userViewDialog(): boolean {
        return this.userService.userViewDialog;
    }

    set userViewDialog(value: boolean) {
        this.userService.userViewDialog = value;
    }

    /**
     * Si la vue 'cartes' est à true, on désactive le multi-tri.
     * sinon, on l'active.
     */
    getSortMode() {
        if (this.isCardDisplayActivated) {
            return 'single';
        }
        return 'multiple';
    }



    viewUser(user: User) {
        this.user = user;
        this.user.createdAt = new Date(user.createdAt);
        this.user.updatedAt = new Date(user.updatedAt);
        this.user.password = null;
        this.userDialogTitle = 'Details d\'un Utilisateur';
        this.userViewDialog = true;
    }


    edit(user: User) {
        this.user = user;
        this.userDialogTitle = 'Editer un Utilisateur';
        this.submitted = true;
        this.userEditDialog = true;
    }


    private findAll() {
        this.userService.findAll();
    }
}


class FlatChercheurs {
    public id: string;
    public numeroMatricule: string;
    public email: string;
    public username: string;
    public prenom: string;
    public nom: string;
    public pays: string;
    public ville: string;
    public createdAt: Date | string;
    public updatedAt: Date | string;


    constructor(chercheur: ChercheurVo) {
        this.id = chercheur.id;
        this.createdAt = chercheur.createdAt ? chercheur.createdAt : '';
        this.updatedAt = chercheur.updatedAt ? chercheur.updatedAt : '';
        this.numeroMatricule = chercheur.numeroMatricule ? chercheur.numeroMatricule : '';
        this.email = chercheur.email ? chercheur.email : '';
        this.username = chercheur.username ? chercheur.username : '';
        this.prenom = chercheur.prenom ? chercheur.prenom : '';
        this.nom = chercheur.nom ? chercheur.nom : '';

    }

}
