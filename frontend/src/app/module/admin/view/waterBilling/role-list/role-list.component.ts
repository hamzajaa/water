import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Role} from 'src/app/controller/model/Role.model';
import {User} from 'src/app/controller/model/User.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {UserService} from 'src/app/controller/service/user.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {
    // declarations
    private _roleDialog: boolean;
    constructor(private userService: UserService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService) {
    }

    // getters and setters


    get selectedRoles(): Role[] {
        return this.roleService.selectedRoles;
    }

    set selectedRoles(roles: Role[]) {
        this.roleService.selectedRoles = roles;
    }


    get roleDialog(): boolean {
        return this._roleDialog;
    }

    set roleDialog(roleDialog: boolean) {
        this._roleDialog = roleDialog;
    }

    get selectedRole(): Role {
        return this.roleService.selectedRole;
    }

    set selectedRole(selectedRole: Role) {
        this.roleService.selectedRole = selectedRole;
    }

    get submitted(): boolean {
        return this.userService.submitted;
    }

    set submitted(submitted: boolean) {
        this.userService.submitted = submitted;
    }

    get roles(): Role[] {
        return this.roleService.roles;
    }



    ngOnInit(): void {
        this.roleService.findAll();
    }

    // methods
    permissions:Permissions[]=[];

    openNew() {
        this.selectedRole = new Role();
        this.submitted = false;
        this.roleDialog = true;
    }

    editUser(role: Role) {
        this.selectedRole = {...role};
        this.roleDialog = true;
    }

    hideDialog() {
        this.roleDialog = false;
        this.submitted = false;
    }

    saveRole() {
        this.submitted = true;
        console.log(this.selectedRole)
        this.roleService.save(this.selectedRole)
        this.roleDialog = false;
    }

    editRoleSubmit() {
        this.submitted = true;
        console.log("before update")
        console.log(this.selectedRole)
        this.roleService.update(this.selectedRole)
        this.roleDialog = false;
        this.messageService.add({severity: 'success', summary: 'User edit', detail: 'User was editted'});

    }

    deleteRole(user: User) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + user.prenom + " " + user.nom + ' ?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.roleService.delete(user.id);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'User Deleted',
                    life: 3000
                });
            }
        });
    }

}
