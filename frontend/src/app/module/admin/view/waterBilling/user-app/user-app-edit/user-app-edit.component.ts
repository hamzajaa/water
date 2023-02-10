import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {environment} from "../../../../../../../environments/environment";
import {UserService} from "../../../../../../controller/service/user.service";
import {StringUtilService} from "../../../../../../controller/service/StringUtil.service";
import {User} from "../../../../../../controller/model/User.model";

@Component({
    selector: 'app-user-app-edit',
    templateUrl: './user-app-edit.component.html',
    styleUrls: ['./user-app-edit.component.scss']
})
export class UserAppEditComponent implements OnInit {

    readonly emailValidationRegex = environment.emailValidation;
    _validEmailUser = true;
    private _errorMessages = new Array<string>();
    password: string;
    confirmPassword: string;
    isMatch: boolean = true;


    constructor(private userService: UserService, private messageService: MessageService, private stringUtilService: StringUtilService) {
    }

    ngOnInit(): void {
        this.initVariables();

    }

    // methods
    openNew() {
        this.submitted = false;
        this.userEditDialog = true;
    }

    editUser(user: User) {
        this.user = {...user};
        this.user.password = null;
        this.userEditDialog = true;
    }

    hideDialog() {
        this.userEditDialog = false;
        this.submitted = false;
    }




    // pilot + admin
    saveUser() {
        if (this.emailValidationRegex.test(this.user.email)) {
            if (this.user.password == this.user.confirmPassword) {
                this.submitted = true;
                // this.user.roles[0].authority = 'ROLE_ADMIN';
                this.userService.save(this.user);
                // this.userDialog = false;
                // this.user = new User();
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Mot de passe ne Correspond pas a la Confirmation'
                });
            }
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'l\'Email Principal ne Correspond pas a la forme XXXX@ird.fr'
            })
        }
    }

    editUserSubmit() {
        this.validateForm();
            this.submitted = true;
            this.userService.update(this.user);
        this.userEditDialog = false;
        }


    private validateEmailUser() {
        if (this.stringUtilService.isEmpty(this.user.email)) {
            this.errorMessages.push('Email not valid');
            this.validEmailUser = false;
        } else {
            this.validEmailUser = true;

        }
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateEmailUser();

    }
    vaidatePasswords(){
        if (this.password ==null || this.confirmPassword ==null || this.password.length == 0 || this.confirmPassword.length == 0 ){
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'veuillez corriger les erreurs dans le formulaire'
            })
            this.isMatch = false;
            return false

        }else return true
    }
    changePassword() {
        if(this.vaidatePasswords())
        if(this.password != null && this.password===this.confirmPassword){
            this.user.password = this.password;
            this.isMatch=true;
            this.editUserSubmit();
        } else {
            this.isMatch = false;
            this.errorMessages.push('les mots de passe sont incompatible');
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'les Mots de Passe sont incompatible'
            })
        }

    }

    private initVariables() {
        this.password='';
        this.confirmPassword='';
        this.isMatch=true;
    }

    resetPassword() {
this.password=this.user.username;
this.confirmPassword=this.user.username;
this.changePassword()
this.editUserSubmit();
this.messageService.add({
    severity:'info',
    summary:'Mot de passe',
    detail:'le mot de passe a été réinitialisé'
})
    }

    // getters and setters


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

    get selectedUsers(): User[] {
        return this.userService.selectedUsers;
    }

    set selectedUsers(selectedUsers: User[]) {
        this.userService.selectedUsers = selectedUsers;
    }

    get userEditDialog(): boolean {
        return this.userService.userEditDialog;
    }

    set userEditDialog(userEditDialog: boolean) {
        this.userService.userEditDialog = userEditDialog;
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


}
