import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {environment} from "../../../../../../../environments/environment";
import {UserService} from "../../../../../../controller/service/user.service";
import {StringUtilService} from "../../../../../../controller/service/StringUtil.service";
import {User} from "../../../../../../controller/model/User.model";
import {RoleService} from "../../../../../../controller/service/role.service";
import {PasswordModule} from 'primeng/password';

@Component({
    selector: 'app-user-app-add',
    templateUrl: './user-app-add.component.html',
    styleUrls: ['./user-app-add.component.scss']
})
export class UserAppAddComponent implements OnInit {



    readonly emailValidationRegex ;//= environment.emailValidation;
    _validEmailUser = true;
    private _errorMessages = new Array<string>();
    public passwordConfirme: string;
    private _confirmPassword=true;



    constructor(private userService: UserService,private roleService: RoleService, private messageService: MessageService, private stringUtilService: StringUtilService) {
    }

    ngOnInit(): void {
    }

    // methods
    openNew() {
        this.submitted = false;
        this.userCreateDialog = true;
    }

    editUser(user: User) {
        this.user = {...user};
        this.user.password = null;
        this.userCreateDialog = true;
    }

    hideDialog() {
        this.userCreateDialog = false;
        this.submitted = false;
    }

    // pilot + admin
    saveUser(hideCreateDialog: boolean) {
        this.validateForm(this.user);
        if(this.errorMessages.length==0){
        this.submitted = true;
        this.userService.save(this.user);
        this.userCreateDialog = false;
        }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Merci de corriger les erreurs sur le formulaire'
            })
        }
    }

    private validateEmailUser() {
        if (this.stringUtilService.isEmpty(this.user.email)) {
            this.errorMessages.push('Email not valid');
            this.validEmailUser = false;
        } else {
            this.validEmailUser = true;
        }
    }

    private validateForm(user:User): void {
        this.errorMessages = new Array<string>();
        this.validateEmailUser();
        this.validatePassword(this.user);

    }






    editUserSubmit() {
        if (this.emailValidationRegex.test(this.user.email)) {
            this.submitted = true;
            this.user.roles[0].authority = 'ROLE_ADMIN';
            this.userService.update(this.user)
            // this.userDialog = false;
            // this.user = new User();
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'l\'Email Principal ne Correspond pas a la forme XXXX@ird.fr'
            })
        }
    }


    // getters and setters


    get confirmPassword(): boolean {
        return this._confirmPassword;
    }

    set confirmPassword(value: boolean) {
        this._confirmPassword = value;
    }

    get roles(){
        return this.roleService.roles
    }

    get validEmailUser(): boolean {
        return this._validEmailUser;
    }

    set validEmailUser(value: boolean) {
        this._validEmailUser = value;
    }

    get dateFormat() {
        return environment.dateFormatCreate;
    }

    get dateFormatColumn() {
        return environment.dateFormatCreate;
    }

    get users(): User[] {
        return this.userService.users;
    }


    set users(users: User[]) {
        this.userService.users = users;
    }

    set selectedUsers(selectedUsers: User[]) {
        this.userService.selectedUsers = selectedUsers;
    }

    get userCreateDialog(): boolean {
        return this.userService.userCreateDialog;
    }

    set userCreateDialog(userCreateDialog: boolean) {
        this.userService.userCreateDialog = userCreateDialog;
    }

    get user(): User {
        return this.userService.user;
    }

    set user(user: User) {
        this.userService.user = user;
    }

    get submitted(): boolean {
        return this.userService.submitted;
    }

    set submitted(submitted: boolean) {
        this.userService.submitted = submitted;
    }

    get userDialogTitle(): string {
        return this.userService.userDialogTitle;
    }


    set userDialogTitle(value: string) {
        this.userService.userDialogTitle = value;
    }

    get errorMessages(): string[] {
        return this._errorMessages;
    }

    set errorMessages(value: string[]) {
        this._errorMessages = value;
    }

    private validatePassword(user:User) {
        if(user.password!=this.passwordConfirme){
this.errorMessages.push('mots de passe incompatible')
            this.confirmPassword=false;
        }else{
            this.confirmPassword=true;
        }
    }
}
