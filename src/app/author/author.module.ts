import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorRoutingModule } from './author-routing.module';
import { AuthorLayoutComponent } from './author-layout/author-layout.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorShowComponent } from './author-show/author-show.component';

@NgModule({
  imports: [
    CommonModule,
    AuthorRoutingModule,
  ],
  declarations: [AuthorLayoutComponent, AuthorListComponent, AuthorShowComponent],
})
export class AuthorModule {
}
