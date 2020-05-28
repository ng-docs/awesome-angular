import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommentCountPipe } from './comment-list/comment-count.pipe';
import { CommentListComponent } from './comment-list/comment-list.component';

import { CommentRoutingModule } from './comment-routing.module';
import { CreateComponent } from './create/create.component';
import { DiscussHomeComponent } from './home/discuss-home.component';
import { LandingComponent } from './landing/landing.component';
import { UserStatusComponent } from './user-status/user-status.component';


@NgModule({
  declarations: [LandingComponent, DiscussHomeComponent, CommentListComponent, UserStatusComponent, CreateComponent, CommentCountPipe],
  imports: [
    CommonModule,
    CommentRoutingModule,
    FormsModule,
    MatButtonModule,
    TextFieldModule,
    MatInputModule,
  ],
  exports: [
    DiscussHomeComponent,
  ],
})
export class CommentModule {
}
