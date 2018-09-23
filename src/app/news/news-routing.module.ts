import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsLayoutComponent } from './news-layout/news-layout.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsShowComponent } from './news-show/news-show.component';

const routes: Routes = [
  {
    path: '',
    component: NewsLayoutComponent,
    children: [
      {
        path: '',
        component: NewsListComponent,
      },
      {
        path: ':id',
        component: NewsShowComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {
}
