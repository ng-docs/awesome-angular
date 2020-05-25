import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { CommentModule } from '../comment/comment.module';
import { SharedModule } from '../shared/shared.module';
import { ArticleHomeComponent } from './article-home/article-home.component';
import { ArticleLayoutComponent } from './article-layout/article-layout.component';
import { ArticleListComponent } from './article-list/article-list.component';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleShowComponent } from './article-show/article-show.component';
import { NavNodeComponent } from './nav-node/nav-node.component';

@NgModule({
  imports: [
    CommonModule,
    ArticleRoutingModule,
    MatTreeModule,
    SharedModule,
    CommentModule,
  ],
  declarations: [
    ArticleLayoutComponent,
    ArticleListComponent,
    ArticleShowComponent,
    NavNodeComponent,
    ArticleHomeComponent,
  ],
})
export class ArticleModule {
}
