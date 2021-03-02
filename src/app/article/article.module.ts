import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { DiscussModule } from '../comment/discuss.module';
import { SharedModule } from '../shared/shared.module';
import { ArticleHomeComponent } from './article-home/article-home.component';
import { ArticleLayoutComponent } from './article-layout/article-layout.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleNavNodeComponent } from './article-nav-node/article-nav-node.component';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleShowComponent } from './article-show/article-show.component';

@NgModule({
  imports: [
    CommonModule,
    ArticleRoutingModule,
    MatTreeModule,
    SharedModule,
    DiscussModule,
  ],
  declarations: [
    ArticleLayoutComponent,
    ArticleListComponent,
    ArticleShowComponent,
    ArticleNavNodeComponent,
    ArticleHomeComponent,
  ],
})
export class ArticleModule {
}
