import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { merge, Subject } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { Issue, QueryIssuesQuery } from '../../../types';
import { GithubService } from '../github-api/github.service';
import { UserModel } from '../github-api/user.model';

function getKeyword(): string {
  return decodeURIComponent(location.pathname.split('/').pop());
}

function getTitle(): string {
  return document.title.split('-')[0].trim();
}

@Component({
  selector: 'app-discuss-home',
  templateUrl: './discuss-home.component.html',
  styleUrls: ['./discuss-home.component.scss'],
})
export class DiscussHomeComponent implements OnInit {
  constructor(public github: GithubService, private router: Router, private apollo: Apollo) {
  }

  me: UserModel;
  issues: QueryIssuesQuery;
  owner = 'site-wangke';
  repo = 'blog';
  update$ = new Subject<string>();

  ngOnInit(): void {
    const navigated$ = this.router.events.pipe(
      filter(it => it instanceof NavigationEnd),
    );
    merge(this.update$, navigated$).pipe(
      switchMap(() => this.github.queryIssues(this.owner, this.repo, getKeyword())),
    ).subscribe(data => {
      this.issues = data;
    });
    this.update$.next();

    this.github.getMe().subscribe(data => this.me = data);
  }

  create(body: string): void {
    if (!this.issues.search.issueCount) {
      this.github.queryRepository(this.owner, this.repo).pipe(
        switchMap((it) => this.github.createIssue(it.repository.id, `${getTitle()}#${getKeyword()}#`, body)),
        tap(() => this.update$.next()),
      ).subscribe();
    } else {
      this.github.addComment((this.issues.search.nodes[0] as Issue).id, body).pipe(
        tap(() => this.update$.next()),
      ).subscribe();
    }
  }
}
