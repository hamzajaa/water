import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';


import {ChercheurVo} from '../model/Chercheur.model';


@Injectable({
    providedIn: 'root'
})
export class ChercheurService {
    public editChercheur$ = new BehaviorSubject<boolean>(false);
    private API = '';
    private role$: Observable<string>;

    constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl + role.toLowerCase() + '/chercheur/';
        });
    }

    private _chercheurs: Array<ChercheurVo>;

    get chercheurs(): Array<ChercheurVo> {
        if (this._chercheurs == null) {
            this._chercheurs = new Array<ChercheurVo>();
        }
        return this._chercheurs;
    }

    set chercheurs(value: Array<ChercheurVo>) {
        this._chercheurs = value;
    }

    private _selectedChercheur: ChercheurVo;

    get selectedChercheur(): ChercheurVo {
        if (this._selectedChercheur == null) {
            this._selectedChercheur = new ChercheurVo();
        }
        return this._selectedChercheur;
    }

    set selectedChercheur(value: ChercheurVo) {
        this._selectedChercheur = value;
    }

    private _chercheurSelections: Array<ChercheurVo>;

    get chercheurSelections(): Array<ChercheurVo> {
        if (this._chercheurSelections == null) {
            this._chercheurSelections = new Array<ChercheurVo>();
        }
        return this._chercheurSelections;
    }

    set chercheurSelections(value: Array<ChercheurVo>) {
        this._chercheurSelections = value;
    }

    private _createChercheurDialog: boolean;

    get createChercheurDialog(): boolean {
        return this._createChercheurDialog;
    }

    set createChercheurDialog(value: boolean) {
        this._createChercheurDialog = value;
    }

    private _editChercheurDialog: boolean;

    get editChercheurDialog(): boolean {
        return this._editChercheurDialog;
    }

    set editChercheurDialog(value: boolean) {
        this._editChercheurDialog = value;
    }

    // getters and setters

    private _viewChercheurDialog: boolean;

    get viewChercheurDialog(): boolean {
        return this._viewChercheurDialog;
    }

    set viewChercheurDialog(value: boolean) {
        this._viewChercheurDialog = value;
    }

    private _searchChercheur: ChercheurVo;

    get searchChercheur(): ChercheurVo {
        if (this._searchChercheur == null) {
            this._searchChercheur = new ChercheurVo();
        }
        return this._searchChercheur;
    }

    set searchChercheur(value: ChercheurVo) {
        this._searchChercheur = value;
    }

    private _switchChercheurDialog: boolean;

    get switchChercheurDialog(): boolean {
        return this._switchChercheurDialog;
    }

    set switchChercheurDialog(value: boolean) {
        this._switchChercheurDialog = value;
    }

    // methods
    public findByUsername(username: string): Observable<ChercheurVo> {
        return this.http.get<ChercheurVo>(this.API + 'username/' + username);
    }

    public findAll() {
        return this.http.get<Array<ChercheurVo>>(this.API);
    }

    public save(): Observable<ChercheurVo> {
        return this.http.post<ChercheurVo>(this.API, {
            ...this.selectedChercheur,
            updatedAt: moment(this.selectedChercheur.updatedAt).format('YYYY-MM-DD')
        });
    }

    delete(chercheur: ChercheurVo) {
        return this.http.delete<number>(this.API + 'id/' + chercheur.id);
    }

    public edit(): Observable<ChercheurVo> {
        return this.http.put<ChercheurVo>(this.API, this.selectedChercheur);
    }

    public findByCriteria(chercheur: ChercheurVo): Observable<Array<ChercheurVo>> {
        return this.http.post<Array<ChercheurVo>>(this.API + 'search', chercheur);
    }

    public findByIdWithAssociatedList(chercheur: ChercheurVo): Observable<ChercheurVo> {
        return this.http.get<ChercheurVo>(this.API + 'detail/id/' + chercheur.id);
    }
}
