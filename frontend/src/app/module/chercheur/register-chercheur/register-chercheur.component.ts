import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {User} from 'src/app/controller/model/User.model';
import {AuthService} from 'src/app/controller/service/Auth.service';
import {Role} from '../../../controller/model/Role.model';

@Component({
    selector: 'app-register-chercheur',
    templateUrl: './register-chercheur.component.html',
    styleUrls: ['./register-chercheur.component.scss']
})
export class RegisterChercheurComponent implements OnInit {
    registerForm = new UntypedFormGroup({
        prenom: new UntypedFormControl('', Validators.required),
        nom: new UntypedFormControl('', Validators.required),
        email: new UntypedFormControl('', Validators.required),
        userName: new UntypedFormControl('', Validators.required),
        password: new UntypedFormControl('', Validators.required)
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
        const {prenom, nom, userName, password, email} = formValues;
        const role = new Role();
        role.authority = 'ROLE_Chercheur';
        this.user.prenom = prenom;
        this.user.nom = nom;
        this.user.username = userName;
        this.user.password = password;
        this.user.email = email;
        this.user.roles = [role];
        this.authService.registerChercheur();

    }

}
