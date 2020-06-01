import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';
import { CommentItemComponent } from './comment-item/comment-item.component';
import { EditComponent } from './comment-item/edit/edit.component';
import { FriendlyTimePipe } from './comment-item/friendly-time.pipe';
import { IconEditComponent } from './comment-item/icons/icon-edit/icon-edit.component';
import { IconEmojiComponent } from './comment-item/icons/icon-emoji/icon-emoji.component';
import { IconQuoteComponent } from './comment-item/icons/icon-quote/icon-quote.component';
import { ReactionListComponent } from './comment-item/reaction-list/reaction-list.component';
import { CommentCountPipe } from './comment-list/comment-count.pipe';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CreateComponent } from './create/create.component';

import { DiscussRoutingModule } from './discuss-routing.module';
import { DiscussComponent } from './discuss/discuss.component';
import { LandingComponent } from './landing/landing.component';
import { UserStatusComponent } from './user-status/user-status.component';


@NgModule({
  declarations: [
    LandingComponent,
    DiscussComponent,
    CommentListComponent,
    UserStatusComponent,
    CreateComponent,
    CommentCountPipe,
    CommentItemComponent,
    FriendlyTimePipe,
    ReactionListComponent,
    IconEmojiComponent,
    IconQuoteComponent,
    IconEditComponent,
    EditComponent,
  ],

  imports: [
    CommonModule,
    DiscussRoutingModule,
    FormsModule,
    MatButtonModule,
    TextFieldModule,
    MatInputModule,
    SharedModule,
  ],
  exports: [
    DiscussComponent,
  ],
})
export class DiscussModule {
}