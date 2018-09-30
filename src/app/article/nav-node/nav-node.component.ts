import { Component, Input, OnInit } from '@angular/core';
import { ArticleGroupModel } from '../data/article-group.model';
import { ArticleModel } from '../data/article.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-node',
  templateUrl: './nav-node.component.html',
  styleUrls: ['./nav-node.component.scss'],
})
export class NavNodeComponent implements OnInit {

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
