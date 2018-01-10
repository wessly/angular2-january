import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms'

import { AuthService } from './../../../services/auth.service'
import { UserService } from './../../../services/user.service'
import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-manage-user',
    templateUrl: './manage-user.component.html',
    styleUrls: ['./manage-user.component.css']
})

export class ManageUserComponent implements OnInit {

    public editUserForm: FormGroup
    public user: Object

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private userService: UserService,
        private toastr: ToastsManager,
        private vcr: ViewContainerRef,
        private router: Router
    ) {
        this.toastr.setRootViewContainerRef(vcr)

    }
    ngOnInit() {
        this.user = this.authService.currentUser

        this.editUserForm = this.fb.group({
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

    submitEditUserForm(payload) {

        this.userService.update(this.user['_id'], {
            username: payload.value.username,
            password: payload.value.confirmPasswords.password,
            isAdmin: this.authService.currentUser['isAdmin']
        }).subscribe(res => {
            this.authService.logout()
            this.router.navigateByUrl('/login')
                .then(() => {
                    this.toastr.success('Profile updated.')
                })
        }, err => {
            this.toastr.error(err.error.description)
        })
    }

    deleteUser() {
        if (window.confirm('Are sure you want to delete your account?')) {
            this.userService.delete(this.user['_id']).subscribe(res => {
                this.authService.logout()
                this.router.navigateByUrl('/')
                    .then(() => {
                        this.toastr.success('Account deleted.')
                    })
            })
        }
    }
}
