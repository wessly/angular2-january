import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-show-article',
    templateUrl: './show-article.component.html',
    styleUrls: ['./show-article.component.css']
})
export class ShowArticleComponent {
    @Input() article: Object
}
