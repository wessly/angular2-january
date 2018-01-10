import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms'

import { AuthService } from './../../../services/auth.service'
import { UserService } from './../../../services/user.service'
import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {

  public userEditId: any
  public allUsers: any

  public user: Object
  public users: Object[]
  public userEditForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef,
    private router: Router
  ) {
    this.users = []
    this.toastr.setRootViewContainerRef(vcr)
  }

  ngOnInit(user: any) {

    this.userService.getAll().subscribe(res => {
      this.users = res

      for (user of this.users) {
        user.edit = false
      }
    })

    this.userEditForm = this.fb.group({
      username: ['', [Validators.required, Validators.min(3), Validators.max(25)]],
      confirmPasswords: this.fb.group({
        password: ['', [Validators.required]],
        repeatPassword: ['', [Validators.required]]
      }, {

          validator: this.matchPasswords

        }),
      isAdmin: ['', [Validators.required]]
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

  showEditForm(user) {
    for (this.allUsers of this.users) {
      this.allUsers.edit = false
    }

    user.edit = true
    this.userEditId = user._id
  }

  hideEditForm(user) {
    user.edit = false
  }

  submitUserEditForm(payload) {

    let privileges;

    if (payload.value.isAdmin === "false") {
      privileges = false
    } else if (payload.value.isAdmin === "true") {
      privileges = true
    } else {
      privileges = false
    }

    this.userService.update(this.userEditId, {
      username: payload.value.username,
      password: payload.value.confirmPasswords.password,
      isAdmin: privileges
    }).subscribe(res => {

      this.toastr.success('User data updated.')

      this.userService.getAll().subscribe(allUsers => {
        this.users = allUsers
      })
    }, err => {
      this.toastr.error(err.error.description)
    })
  }

}
