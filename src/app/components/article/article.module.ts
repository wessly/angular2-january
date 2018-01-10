import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { articleComponents } from './index'
import { ArticleService } from './../../services/article.service'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        ...articleComponents
    ],
    providers: [
        ArticleService
    ]
})

export class ArticleModule { }
