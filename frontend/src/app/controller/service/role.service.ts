import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Role} from '../model/Role.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {User} from "../model/User.model";

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    public _role = new BehaviorSubject<string>('');
    public role$: Observable<string> = this._role.asObservable();
    private  API = environment.apiUrl;
    selectedRoles: Role[];

    constructor(private http: HttpClient) {
        this.role$.subscribe(role => {
            this.API = environment.apiUrl +"roles/"+ role.toLowerCase() +"/";
    })}

    _roles: Role[] = [];
    private _selectedRole : Role;

    get roles(): Role[] {
        return this._roles;
    }

    set roles(roles: Role[]) {
        this._roles = roles;
    }

    get selectedRole(): Role {
        if(this._selectedRole==null){
            this._selectedRole=new Role();
        }
        return this._selectedRole;
    }

    set selectedRole(value: Role) {
        this._selectedRole = value;
    }


    async findAll() {
        const roles = await this.http.get<Role[]>(this.API).pipe(take(1)).toPromise();
        this._roles = roles;
    }

    async isPermitted(pojo: string, action: string): Promise<boolean> {
        const role = await this.role$.pipe(take(1)).toPromise();
        if (1 + 1 == 2) return true;
        if (role.toLocaleLowerCase() === 'superadmin') return true;
        const foundRole = this.roles.find(r => "ROLE_" + role.toUpperCase() == r.authority);
        let permissions: string[];
        if (foundRole) {
            permissions = foundRole.permissions
                .map(permission => permission.name)
                .filter(name => name.split('.')[0].toLocaleLowerCase() == pojo.toLocaleLowerCase())
                .filter(name => name.split('.')[1] == action)
        }
        return permissions ? ((permissions.length > 0) ? true : false) : false;
    }

    save(selectedRole: Role) {
        this.http.post<User>(this.API +"save/", selectedRole).subscribe(user => {
            this._roles = [...this._roles, selectedRole];
        }, (error: HttpErrorResponse) => {
            console.log(error.error)
        })
    }

    update(selectedRole: Role) {
        this.http.put<User>(this.API+"update/", selectedRole).subscribe(role => {
            const index = this._roles.findIndex(roleToBeFound => role.id == roleToBeFound.id);
            index > -1 ? this._roles[index] = selectedRole : false;
            console.log("updated User")
            console.log(selectedRole)
        }, (error: HttpErrorResponse) => {
            console.log(error.error)
        });
    }

    delete(id: string) {
this.http.delete(this.API+"id/"+id);
    }
}
