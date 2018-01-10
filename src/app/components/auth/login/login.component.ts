import {
    Component,
    OnInit,
    ViewContainerRef,
    Output,
    EventEmitter
} from '@angular/core';

import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms'

import { User } from './../../../models/input-models/user'
import { AuthService } from './../../../services/auth.service'
import { Router } from '@angular/router'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    public errorMsg: string
    public loginForm: FormGroup
    public user: User = new User('', '', '', false)
    private sub$

    @Output() onReached5 = new EventEmitter<boolean>()

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private toastr: ToastsManager,
        private vcr: ViewContainerRef
    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {

        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.min(3), Validators.max(25)]],
            password: ['', [Validators.required]]
        })
    }

    submitLoginForm(payload) {

        this.sub$ = this.authService.login({
            username: payload.value.username,
            password: payload.value.password
        }).subscribe(res => {
            const authToken = res._kmd.authtoken
            sessionStorage.setItem('authToken', authToken)
            sessionStorage.setItem('userName', res.username)
            this.authService.currentAuthToken = authToken
            this.authService.currentUser = res
            this.router.navigateByUrl('/article/all')
                .then(() => {
                    this.toastr.success('Login Successful!')
                })
        }, errRes => {
            this.errorMsg = 'Wrong credentials!'
            this.toastr.error('Wrong credentials!')
        })
    }

    ngOnDestroy() {
        if (this.sub$ && typeof this.sub$.unsubscribe === 'function') {
            this.sub$.unsubscribe()
            console.log('Unsubscribed')
        }
    }
}
