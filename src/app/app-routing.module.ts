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
    path: 'authors',
    loadChildren: './author/author.module#AuthorModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
