import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from '../model/User.model';
import {environment} from '../../../environments/environment';
import {RoleService} from "./role.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    // declarations
    API = environment.apiUrl;
    private role$: any;
    private _users: User[] = [];
    userCreateDialog: boolean;
    userDialogTitle: string;
    userEditDialog: boolean;
    userViewDialog: boolean;

    constructor(private http: HttpClient,private roleService:RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl + role.toLowerCase() + '/users/';
        });
    }

    // getters and setters
    get users(): User[] {
        return this._users;
    }

    set users(users: User[]) {
        this._users = users;
    }

    private _selectedUsers: User[] = [];

    get selectedUsers(): User[] {
        return this._users;
    }

    set selectedUsers(selectedUsers: User[]) {
        this._selectedUsers = selectedUsers;
    }

    private _userDialog: boolean = false;

    get userDialog(): boolean {
        return this._userDialog;
    }

    set userDialog(userDialog: boolean) {
        this._userDialog = userDialog;
    }

    private _user: User = new User();

    get user(): User {
        return this._user;
    }

    set user(user: User) {
        this._user = user;
    }

    private _submitted: boolean;

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(submitted: boolean) {
        this._submitted = submitted;
    }

    // methods
    findAll() {
        this.http.get<User[]>(this.API).subscribe(users => {
            this._users = users;
        }, (error: HttpErrorResponse) => {
            console.log(error.error)
        })
    }

    save(user: User) {
        this.http.post<User>(this.API +"save", user).subscribe(user => {
            this._users = [...this._users, user];
        }, (error: HttpErrorResponse) => {
            console.log(error.error)
        })
    }

    update(user: User) {
        return this.http.put<User>(this.API, user).subscribe(user => {
            const index = this._users.findIndex(userToBeFound => user.id == userToBeFound.id);
            index > -1 ? this._users[index] = user : false;
            console.log("updated User")
            console.log(user)
        }, (error: HttpErrorResponse) => {
            console.log(error.error)
        });
    }

    delete(id: string) {
        this.http.delete<number>(this.API + "id/" + id).subscribe(res => {
            res == 1 ? this._users = this._users.filter(user => user.id != id) : false;
        })
    }

    findByUsername(username){
        return this.http.get<User>(this.API+'username/'+username);
    }
}
