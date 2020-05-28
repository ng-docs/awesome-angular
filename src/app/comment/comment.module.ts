import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommentListComponent } from './comment-list/comment-list.component';

import { CommentRoutingModule } from './comment-routing.module';
import { CreateComponent } from './create/create.component';
import { DiscussHomeComponent } from './home/discuss-home.component';
import { LandingComponent } from './landing/landing.component';
import { UserStatusComponent } from './user-status/user-status.component';


@NgModule({
  declarations: [LandingComponent, DiscussHomeComponent, CommentListComponent, UserStatusComponent, CreateComponent],
  imports: [
    CommonModule,
    CommentRoutingModule,
    FormsModule,
    MatButtonModule,
  ],
  exports: [
    DiscussHomeComponent,
  ],
})
export class CommentModule {
}
