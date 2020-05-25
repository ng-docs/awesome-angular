import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommentListComponent } from './comment-list/comment-list.component';

import { CommentRoutingModule } from './comment-routing.module';
import { DiscussHomeComponent } from './home/discuss-home.component';
import { LandingComponent } from './landing/landing.component';
import { UserStatusComponent } from './user-status/user-status.component';


@NgModule({
  declarations: [LandingComponent, DiscussHomeComponent, CommentListComponent, UserStatusComponent],
  imports: [
    CommonModule,
    CommentRoutingModule,
  ],
  exports: [
    DiscussHomeComponent,
  ],
})
export class CommentModule {
}
