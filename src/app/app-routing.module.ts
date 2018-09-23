import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/articles',
  },
  {
    path: 'articles',
    loadChildren: './article/article.module#ArticleModule',
  },
  {
    path: 'libraries',
    loadChildren: './library/library.module#LibraryModule',
  },
  {
    path: 'news',
    loadChildren: './news/news.module#NewsModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
