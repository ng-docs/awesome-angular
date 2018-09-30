import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorLayoutComponent } from './author-layout/author-layout.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorShowComponent } from './author-show/author-show.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorLayoutComponent,
    children: [
      {
        path: '',
        component: AuthorListComponent,
      },
      {
        path: ':name',
        component: AuthorShowComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorRoutingModule {
}
