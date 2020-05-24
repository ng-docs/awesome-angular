import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github-api/github.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {

  constructor(public github: GithubService) {
  }

  ngOnInit(): void {
    this.github.getCurrentUser().subscribe(console.log);
  }
}
