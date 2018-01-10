import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { ArticleService } from './../../../services/article.service'
import { AuthService } from './../../../services/auth.service'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent {

  public users: Object[]

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef
  ) {
    this.users = []
    this.toastr.setRootViewContainerRef(vcr)
  }

  ngOnInit(article: any) {
    this.userService.getAll().subscribe(res => {
      this.users = res
    })
  }

  deleteUser(id, arrIndex) {
    if (window.confirm('Are sure you want to delete this user?')) {
      this.userService.delete(id).subscribe(res => {
        this.toastr.success('The user was deleted.')
          .then(() => {
            this.users.splice(arrIndex, 1)

            this.userService.getAll().subscribe(allUsers => {
              this.users = allUsers
            })
          })
      })
    }
  }

}
