// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// Components
import { authComponents } from './index'

// Services
import { AuthService } from './../../services/auth.service'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        ...authComponents
    ],
    providers: [
        AuthService
    ]
})

export class AuthModule { }
