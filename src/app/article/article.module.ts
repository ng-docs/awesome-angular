import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleLayoutComponent } from './article-layout/article-layout.component';
import { SharedModule } from '../shared/shared.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleShowComponent } from './article-show/article-show.component';

@NgModule({
  imports: [
    CommonModule,
    ArticleRoutingModule,
    SharedModule,
  ],
  declarations: [ArticleLayoutComponent, ArticleListComponent, ArticleShowComponent],
})
export class ArticleModule {
}
