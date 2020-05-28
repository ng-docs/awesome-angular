import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { merge, Subject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { GetIssuesQuery } from '../../../types';
import { GithubService } from '../github-api/github.service';
import { UserModel } from '../github-api/user.model';

function getKeyword(): string {
  return decodeURIComponent(location.pathname.split('/').pop());
}

@Component({
  selector: 'app-discuss-home',
  templateUrl: './discuss-home.component.html',
  styleUrls: ['./discuss-home.component.scss'],
})
export class DiscussHomeComponent implements OnInit {
  me: UserModel;

  constructor(public github: GithubService, private router: Router) {
  }

  issues: GetIssuesQuery;

  owner = 'site-wangke';
  repo = 'blog';

  ngOnInit(): void {
    const init$ = new Subject<string>();
    const navigated$ = this.router.events.pipe(
      filter(it => it instanceof NavigationEnd),
    );
    merge(init$, navigated$).pipe(
      switchMap(() => this.github.queryIssues(this.owner, this.repo, getKeyword())),
    ).subscribe(data => this.issues = data);
    init$.next();

    this.github.getMe().subscribe(data => this.me = data);
  }

  create(content: string): void {
    if (!this.issues.search.issueCount) {
      this.github.createIssue(this.owner, this.repo, content);
    } else {
      this.github.createComment();
    }
  }
}
