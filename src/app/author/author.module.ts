import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthorLayoutComponent } from './author-layout/author-layout.component';
import { AuthorListComponent } from './author-list/author-list.component';

import { AuthorRoutingModule } from './author-routing.module';
import { AuthorShowComponent } from './author-show/author-show.component';

@NgModule({
  imports: [
    CommonModule,
    AuthorRoutingModule,

    SharedModule,
  ],
  declarations: [AuthorLayoutComponent, AuthorListComponent, AuthorShowComponent],
})
export class AuthorModule {
}
