import { Component, Input, OnInit } from '@angular/core';
import { Issue, IssueComment, User } from '../../../types';
import { DiscussService } from '../services/discuss.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit {

  constructor(public discuss: DiscussService) {
  }

  @Input()
  comment: Issue | IssueComment;

  get user(): User {
    return this.comment.author as User;
  }

  ngOnInit(): void {
  }
}
