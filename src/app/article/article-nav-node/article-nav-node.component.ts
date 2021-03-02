import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleGroupModel } from '../data/article-group.model';
import { ArticleModel } from '../data/article.model';

@Component({
  selector: 'app-article-nav-node',
  templateUrl: './article-nav-node.component.html',
  styleUrls: ['./article-nav-node.component.scss'],
})
export class ArticleNavNodeComponent implements OnInit {

  @Input()
  data: ArticleGroupModel;

  constructor(private router: Router) {
  }

  isActiveGroup(node: ArticleModel | ArticleGroupModel): boolean {
    if (node.type === 'article') {
      return this.router.isActive('/articles/' + node.id, true);
    }
    if (node.type === 'group') {
      return (node as ArticleGroupModel).children.some((subNode) => this.isActiveGroup(subNode));
    }
    return false;
  }

  ngOnInit() {
  }

}
