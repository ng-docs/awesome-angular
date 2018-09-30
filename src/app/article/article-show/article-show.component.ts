import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { findArticleById } from '../data/articles';
import { ArticleModel } from '../data/article.model';

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
    this.route.params.subscribe(({ id }) => {
      this.article = findArticleById(id);
    });
  }

}
