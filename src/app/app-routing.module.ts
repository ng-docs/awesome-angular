import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetTitleGuard } from './core/guard/set-title.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [SetTitleGuard],
    children: [
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
