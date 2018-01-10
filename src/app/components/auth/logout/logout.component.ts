import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from './../../../services/auth.service'

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
    constructor(
        private router: Router,
        private authService: AuthService
    ) {
        this.authService.logout()
        this.router.navigateByUrl('/login')
    }
}
