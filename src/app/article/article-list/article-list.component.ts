import { Component, OnInit } from '@angular/core';
import { articles } from '../data/articles';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {

  items = articles;

  constructor() {
  }

  ngOnInit() {
  }

}
