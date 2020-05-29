import { Component, Input, OnInit } from '@angular/core';
import { Issue, IssueComment, User } from '../../../types';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit {

  constructor() {
  }

  @Input()
  comment: Issue | IssueComment;

  get user(): User {
    return this.comment.author as User;
  }

  ngOnInit(): void {
  }
}
