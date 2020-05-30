import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleLayoutComponent } from '../article/article-layout/article-layout.component';
import { LandingComponent } from './landing/landing.component';


const routes: Routes = [
  {
    path: '',
    component: ArticleLayoutComponent,
    children: [
      {
        path: 'landing',
        component: LandingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentRoutingModule {
}
