import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { articleIsTranslation, ArticleModel } from '../data/article.model';
import { findArticleById } from '../data/articles';

@Component({
  selector: 'app-article-show',
  templateUrl: './article-show.component.html',
  styleUrls: ['./article-show.component.scss'],
})
export class ArticleShowComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
  }

  article: ArticleModel;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.article = findArticleById(params.get('id'));
    });
  }

  isTranslation(article: ArticleModel): boolean {
    return articleIsTranslation(article);
  }
}
