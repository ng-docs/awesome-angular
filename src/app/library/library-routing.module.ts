import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryLayoutComponent } from './library-layout/library-layout.component';
import { LibraryListComponent } from './library-list/library-list.component';
import { LibraryShowComponent } from './library-show/library-show.component';

const routes: Routes = [
  {
    path: '',
    component: LibraryLayoutComponent,
    children: [
      {
        path: '',
        component: LibraryListComponent,
      },
      {
        path: ':id',
        component: LibraryShowComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryRoutingModule {
}
