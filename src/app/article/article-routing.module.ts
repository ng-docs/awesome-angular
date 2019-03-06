import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleLayoutComponent } from './article-layout/article-layout.component';
import { ArticleShowComponent } from './article-show/article-show.component';
import { ArticleHomeComponent } from './article-home/article-home.component';

const routes: Routes = [
  {
    path: '',
    component: ArticleLayoutComponent,
    children: [
      {
        path: '',
        component: ArticleHomeComponent,
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
