import { Component, Input } from '@angular/core';
import { GetIssuesQuery } from '../../../types';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent {
  @Input() items: GetIssuesQuery['search']['nodes'];
}