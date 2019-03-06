import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleLayoutComponent } from './article-layout/article-layout.component';
import { SharedModule } from '../shared/shared.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleShowComponent } from './article-show/article-show.component';
import { MatTreeModule } from '@angular/material';
import { NavNodeComponent } from './nav-node/nav-node.component';
import { ArticleHomeComponent } from './article-home/article-home.component';

@NgModule({
  imports: [
    CommonModule,
    ArticleRoutingModule,
    MatTreeModule,
    SharedModule,
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
