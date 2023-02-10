import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {User} from 'src/app/controller/model/User.model';
import {AuthService} from 'src/app/controller/service/Auth.service';
import {Role} from '../../../controller/model/Role.model';

@Component({
    selector: 'app-register-admin',
    templateUrl: './register-admin.component.html',
    styleUrls: ['./register-admin.component.scss']
})
export class RegisterAdminComponent implements OnInit {
    registerForm = new UntypedFormGroup({
        prenom: new UntypedFormControl('', Validators.required),
        nom: new UntypedFormControl('', Validators.required),
        email: new UntypedFormControl('', Validators.required),
        userName: new UntypedFormControl('', Validators.required),
        password: new UntypedFormControl('', Validators.required),
        telephone: new UntypedFormControl('', Validators.required)
    });

    constructor(private authService: AuthService) {
    }

    get user(): User {
        return this.authService.user;
    }

    set user(value: User) {
        this.authService.user = value;
    }

    ngOnInit(): void {
    }

    submit() {
        const formValues = this.registerForm.value;
        const {prenom, nom, userName, password, email, telephone} = formValues;
        const role = new Role();
        role.authority = 'ROLE_Admin';
        this.user.prenom = prenom;
        this.user.nom = nom;
        this.user.username = userName;
        this.user.password = password;
        this.user.email = email;
        this.user.telephone = telephone;
        this.user.roles = [role];
        this.authService.registerAdmin();
    }

}
