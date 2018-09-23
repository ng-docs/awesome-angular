import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleLayoutComponent } from './article-layout/article-layout.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleShowComponent } from './article-show/article-show.component';

const routes: Routes = [
  {
    path: '',
    component: ArticleLayoutComponent,
    children: [
      {
        path: '',
        component: ArticleListComponent,
      },
      {
        path: ':id',
        component: ArticleShowComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {
}
