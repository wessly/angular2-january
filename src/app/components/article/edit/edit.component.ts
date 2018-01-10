import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { ArticleService } from './../../../services/article.service'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditComponent {

    @Input() article: Object

    constructor(
        private articleService: ArticleService,
        private toastr: ToastsManager,
        private vcr: ViewContainerRef
    ) {
        this.toastr.setRootViewContainerRef(vcr)
    }

    handleSubmitChanges(inputArticle) {
        const id = inputArticle._id
        this.articleService.getById(id)
            .subscribe(article => {
                this.articleService.edit(id, {
                    category: inputArticle.category,
                    title: inputArticle.title,
                    content: inputArticle.content,
                    image: inputArticle.image,
                    status: inputArticle.status,
                    date: article.date,
                    createdBy: article.createdBy
                }).subscribe(res => {      
                    this.toastr.success('Article edited successfully!')
                        .then(() => {
                            this.article['editMode'] = false
                        })
                }, editErr => {
                    this.toastr.error(editErr.error.description)
                })
            }, getErr => {
                this.toastr.error(getErr.error.description)
            })
    }
}
