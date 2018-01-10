import { Component, ViewContainerRef, OnInit } from '@angular/core';

import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms'

import { Article } from './../../../models/input-models/article'
import { ArticleService } from './../../../services/article.service'
import { Router } from '@angular/router'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'app-new-article',
    templateUrl: './new-article.component.html',
    styleUrls: ['./new-article.component.css']
})

export class NewArticleComponent implements OnInit {

    public errorMsg: string
    public articleForm: FormGroup
    public article: Article

    constructor(
        private fb: FormBuilder,
        private articleService: ArticleService,
        private router: Router,
        private toastr: ToastsManager,
        private vcr: ViewContainerRef
    ) {
        this.toastr.setRootViewContainerRef(vcr);
        this.article = new Article('', '', '', '', '')
    }

    ngOnInit() {

        this.articleForm = this.fb.group({
            category: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(55)]],
            title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
            content: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(5000)]],
            image: [''],
            status: ['', [Validators.required]],
        })

    }

    submitNewArticleForm(payload) {

        this.articleService.addNew({
            category: payload.value.category,
            title: payload.value.title,
            content: payload.value.content,
            image: payload.value.image,
            status: payload.value.status,
            date: new Date(),
            createdBy: sessionStorage.getItem('userName')
        }).subscribe(res => {
            this.router.navigateByUrl('/article/all')
                .then(() => {
                    this.toastr.success('Article Created!')
                })
        }, errRes => {
            this.toastr.error(errRes.error.description)
        })
    }
}
