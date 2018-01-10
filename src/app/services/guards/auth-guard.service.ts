import { Injectable, ViewContainerRef } from '@angular/core';
import { CanActivate, Router } from '@angular/router'
import { AuthService } from './../auth.service'
import { ToastsManager } from 'ng2-toastr';

@Injectable()

export class AuthGuardService implements CanActivate {
    
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(): boolean {
        
        let isLogged = this.authService.isUserLogged()
        if (!isLogged) {
            this.router.navigateByUrl('/login')
        }
        
        return isLogged
    }
}
