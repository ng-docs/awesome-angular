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
        loadChildren: () => import('./article/article.module').then(m => m.ArticleModule),
      },
      {
        path: 'authors',
        loadChildren: () => import('./author/author.module').then(m => m.AuthorModule),
      },
      {
        path: 'comments',
        loadChildren: () => import('./comment/discuss.module').then(m => m.DiscussModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    initialNavigation: 'enabled',
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
