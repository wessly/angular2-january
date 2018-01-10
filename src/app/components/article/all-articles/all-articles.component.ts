import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { ArticleService } from './../../../services/article.service'
import { AuthService } from './../../../services/auth.service'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'app-all-articles',
    templateUrl: './all-articles.component.html',
    styleUrls: ['./all-articles.component.css']
})
export class AllArticlesComponent {

    public isAuthor: boolean
    public articles: Object[]

    constructor(
        private articleService: ArticleService,
        private authService: AuthService,
        private toastr: ToastsManager,
        private vcr: ViewContainerRef
    ) {
        this.articles = []
        this.toastr.setRootViewContainerRef(vcr)
    }

    ngOnInit(article: any) {

        if (this.authService.isUserLogged()) {

            this.articleService.getAll().subscribe(res => {

                this.articles = res.reverse()

                for (article of this.articles) {
                    if (article.createdBy === this.authService.currentUser.username) {
                        article.isAuthor = true
                    }
                }

            })

        } else {

            this.articleService.getAll().subscribe(res => {

                this.articles = res.reverse().filter(function (article) {
                    return article.status === "0"
                })

            })

        }
    }

    editArticle(article: Object) {

        if (article['editMode'] === true) {
            article['editMode'] = false
        } else {
            article['editMode'] = true
        }

    }

    deleteArticle(id, arrIndex) {
        if (window.confirm('Are sure you want to delete this article?')) {
            this.articleService.delete(id).subscribe(res => {
                if (res.count === 1) {
                    this.toastr.success('The article was deleted.')
                        .then(() => {
                            this.articles.splice(arrIndex, 1)
                        })
                }
            }, err => {
                console.log(err)
            })
        }
    }
}
