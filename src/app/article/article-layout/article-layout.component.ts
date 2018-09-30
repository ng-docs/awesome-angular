import { Component, OnInit } from '@angular/core';
import { articles } from '../data/articles';

@Component({
  selector: 'app-article-layout',
  templateUrl: './article-layout.component.html',
  styleUrls: ['./article-layout.component.scss'],
})
export class ArticleLayoutComponent implements OnInit {

  constructor() {
  }

  articles = articles;

  ngOnInit() {
  }

}
