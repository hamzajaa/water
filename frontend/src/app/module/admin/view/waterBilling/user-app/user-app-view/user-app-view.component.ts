import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {UserService} from "../../../../../../controller/service/user.service";
import {User} from "../../../../../../controller/model/User.model";
import {environment} from "../../../../../../../environments/environment";


@Component({
    selector: 'app-user-app-view',
    styleUrls: ['./user-app-view.component.scss'],
    templateUrl: './user-app-view.component.html'
})
export class UserAppViewComponent implements OnInit {

    constructor(private userService: UserService, private messageService: MessageService) {
    }

    ngOnInit(): void {


    }

    // methods
    openNew() {
        this.submitted = false;
        this.userViewDialog = true;
    }


    hideDialog() {
        this.userViewDialog = false;
        this.submitted = false;
    }


    // getters and setters
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

    get userViewDialog(): boolean {
        return this.userService.userViewDialog;
    }

    set userViewDialog(value: boolean) {
        this.userService.userViewDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatEdit;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }


}
