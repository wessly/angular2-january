import { Component, OnInit } from '@angular/core'

import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms'

import { User } from './../../../models/input-models/user'
import { AuthService } from './../../../services/auth.service'
import { ToastsManager } from 'ng2-toastr/ng2-toastr'
import { ViewContainerRef } from '@angular/core'
import { Router } from '@angular/router'

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [
        AuthService,
        ToastsManager
    ]
})
export class RegisterComponent implements OnInit {

    public errorMsg: string
    public registerForm: FormGroup
    public user: User = new User('', '', '', false)

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private toastr: ToastsManager,
        private vcr: ViewContainerRef,
        private router: Router
    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {

        this.registerForm = this.fb.group({
            username: ['', [Validators.required, Validators.min(3), Validators.max(25)]],
            confirmPasswords: this.fb.group({
                password: ['', [Validators.required]],
                repeatPassword: ['', [Validators.required]]
            }, {

                    validator: this.matchPasswords

                })
        })
    }

    matchPasswords(AC: AbstractControl) {

        let password = AC.get("password").value
        let confirmPassword = AC.get("repeatPassword").value

        if (password != confirmPassword) {
            AC.get("repeatPassword").setErrors({ MatchPassword: true })
        } else {
            return null
        }
    }

    submitRegisterForm(payload) {

        this.authService.register({
            username: payload.value.username,
            password: payload.value.confirmPasswords.password,
            isAdmin: false
        }).subscribe(res => {
            if (res._kmd.authtoken) {
                this.router.navigateByUrl('/login')
                    .then(() => {
                        this.toastr.success('Register successfull.', null, {toastLife: 3000});
                    })
            }
        }, errRes => {
            this.errorMsg = errRes.error.description
            this.toastr.error(errRes.error.description)
        })
    }
}
