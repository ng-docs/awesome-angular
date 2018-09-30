import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorModel } from '../data/author.model';
import { findAuthorByName } from '../data/authors';
import { ArticleModel } from '../../article/data/article.model';
import { flattenArticles } from '../../article/data/articles';

@Component({
  selector: 'app-author-show',
  templateUrl: './author-show.component.html',
  styleUrls: ['./author-show.component.scss'],
})
export class AuthorShowComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
  }

  author: AuthorModel;
  articles: ArticleModel[];

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.author = findAuthorByName(params.get('name'));
      this.articles = flattenArticles.filter(it => it.author === this.author.name);
    });
  }
}
