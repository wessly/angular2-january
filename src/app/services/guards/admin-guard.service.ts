import { Injectable, ViewContainerRef } from '@angular/core';
import { CanActivate, Router } from '@angular/router'
import { AuthService } from './../auth.service'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()

export class AdminGuardService implements CanActivate {
    
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(): boolean {

        let isAdmin = this.authService.isUserAdmin()
        if (!isAdmin) {
            this.router.navigateByUrl('/login')
        }
        
        return isAdmin
    }
}
