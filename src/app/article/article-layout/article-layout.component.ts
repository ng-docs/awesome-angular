import { Component, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import { ArticleGroupModel } from '../data/article-group.model';
import { ArticleModel } from '../data/article.model';
import { articles } from '../data/articles';

@Component({
  selector: 'app-article-layout',
  templateUrl: './article-layout.component.html',
  styleUrls: ['./article-layout.component.scss'],
})
export class ArticleLayoutComponent implements OnInit {
  constructor() {
  }

  articles: ArticleGroupModel;

  ngOnInit() {
    this.search('');
  }

  search(keyword: string): void {
    this.articles = cloneDeep(articles);
    removeUnmatched(this.articles, keyword);
  }
}

function removeUnmatched(group: ArticleGroupModel, keyword: string): void {
  group.children = group.children.filter(it => matched(it, keyword));
  group.children.forEach(it => {
    if (it.type === 'group') {
      removeUnmatched(it, keyword);
    }
  });
}

function matched(node: ArticleGroupModel | ArticleModel, keyword: string): boolean {
  if (node.type === 'article') {
    return [node.title, node.originTitle, node.author, node.originTitle, node.content].some(it => it?.includes(keyword));
  } else if (node.type === 'group') {
    return [node.title, node.originTitle, node.summary].some(it => it?.includes(keyword)) || node.children.some(it => matched(it, keyword));
  }
}
