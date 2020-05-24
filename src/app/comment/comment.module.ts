import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CommentRoutingModule } from './comment-routing.module';
import { LandingComponent } from './landing/landing.component';


@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    CommentRoutingModule,
  ],
})
export class CommentModule {
}
