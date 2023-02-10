import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {AuthService} from 'src/app/controller/service/Auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login-chercheur',
    templateUrl: './login-chercheur.component.html',
    styleUrls: ['./login-chercheur.component.scss']
})
export class LoginChercheurComponent implements OnInit {
    loginForm = new UntypedFormGroup({
        username: new UntypedFormControl('', Validators.required),
        password: new UntypedFormControl('', Validators.required)
    })

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit(): void {
    }

    submit() {
        const formValues = this.loginForm.value;
        const username = formValues.username;
        const passowrd = formValues.password;
        this.authService.loginChercheur(username, passowrd);

    }

    register() {
        this.router.navigate(['/chercheur/register']);
    }
}
