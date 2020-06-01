import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { map, publishReplay, refCount, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Issue, IssueComment, QueryIssuesQuery, ReactionContent } from '../../../types';
import { GithubService } from './github-api/github.service';
import { Query } from './github-api/query';
import { UserModel } from './github-api/user.model';

const client_id = environment.clientId;
const client_secret = environment.clientSecret;
const KEY_ACCESS_TOKEN = 'accessToken';

function escapeKeyword(label: string): string {
  if (!label) {
    return '';
  }
  return decodeURIComponent(label).replace(/ @@ /g, ' \\x40\\x40 ');
}

function getTitle(): string {
  return document.title.replace(/^(.*) - .*/, '$1').trim();
}

function getCommentsOf(issue: DiscussService['issues'][0]) {
  return issue.comments.nodes.map(it => it.__typename === 'IssueComment' ? it : undefined);
}

@Injectable({
  providedIn: 'root',
})
export class DiscussService {

  constructor(private github: GithubService) {
  }

  private query: QueryIssuesQuery;
  private owner: string;
  private repo: string;
  private url: string;
  changes$ = new Subject<void>();
  editingText = '';

  get issues() {
    return this.query?.search.nodes.map(it => {
      if (it.__typename === 'Issue') {
        return it;
      }
    }).filter(it => !!it);
  }

  get commentCount(): number {
    return this.issues
      .map(it => 1 + it.comments.nodes.length)
      .reduce((prev, length) => prev + length, 0);
  }

  private get firstIssue(): this['issues'][0] {
    return this.issues?.[0];
  }

  get noIssue(): boolean {
    return !this.issues?.length;
  }

  private _me: UserModel;

  get me(): Readonly<UserModel> {
    return this._me;
  }

  loading = true;

  get accessToken(): string {
    return localStorage.getItem(KEY_ACCESS_TOKEN);
  }

  set accessToken(value: string) {
    localStorage.setItem(KEY_ACCESS_TOKEN, value);
  }

  get loginUrl(): string {
    const oauthUri = 'https://github.com/login/oauth/authorize';
    const oauthParams = {
      scope: 'public_repo',
      redirect_uri: environment.redirectUri,
      client_id,
      client_secret,
    };

    return `${oauthUri}${Query.stringify(oauthParams)}`;
  }

  getCommentsOf(issueId: string): ReturnType<typeof getCommentsOf> {
    const issue = this.issues.find(it => it.id === issueId);
    return getCommentsOf(issue);
  }

  startup(): Observable<UserModel> {
    if (this.accessToken) {
      return this.getCurrentUser();
    } else {
      this.loading = false;
      return EMPTY;
    }
  }

  getCurrentUser() {
    this.loading = true;
    return this.github.getCurrentUser(this.accessToken).pipe(
      tap(user => this._me = user),
      tap(() => this.changes$.next()),
      tap(() => this.loading = false, () => this.loading = false),
    );
  }

  logout(): void {
    localStorage.removeItem(KEY_ACCESS_TOKEN);
    this._me = undefined;
  }

  enter(owner: string, repo: string, url: string): void {
    this.owner = owner;
    this.repo = repo;
    this.url = url;
  }

  reload(): Observable<QueryIssuesQuery> {
    return this.github.queryIssues(this.owner, this.repo, ` @@ ${escapeKeyword(this.url)}`, this.accessToken).pipe(
      tap(data => this.query = data),
      tap(() => this.changes$.next()),
    );
  }

  createIssue(body: string): Observable<QueryIssuesQuery> {
    return this.getRepositoryId().pipe(
      switchMap((it) => this.github.createIssue(it, `${getTitle()} @@ ${(escapeKeyword(location.pathname))}`, body, this.accessToken)),
      switchMap(() => this.reload()),
    );
  }

  updateIssue(id: string, body: string): Observable<QueryIssuesQuery> {
    return this.getRepositoryId().pipe(
      switchMap((it) => this.github.updateIssue(id, body, this.accessToken)),
      switchMap(() => this.reload()),
    );
  }

  private getRepositoryId(): Observable<string> {
    return this.github.queryRepository(this.owner, this.repo, this.accessToken).pipe(
      map(resp => resp.repository.id),
      publishReplay(1),
      refCount(),
    );
  }

  addComment(body: string): Observable<QueryIssuesQuery> {
    return this.github.addComment(this.firstIssue.id, body, this.accessToken).pipe(
      switchMap(() => this.reload()),
    );
  }

  updateComment(id: string, body: string): Observable<QueryIssuesQuery> {
    return this.github.updateComment(id, body, this.accessToken).pipe(
      switchMap(() => this.reload()),
    );
  }

  addReaction(subjectId: string, content: ReactionContent): Observable<QueryIssuesQuery> {
    return this.github.addReaction(subjectId, content, this.accessToken).pipe(
      switchMap(() => this.reload()),
    );
  }

  removeReaction(subjectId: string, content: ReactionContent): Observable<QueryIssuesQuery> {
    return this.github.removeReaction(subjectId, content, this.accessToken).pipe(
      switchMap(() => this.reload()),
    );
  }

  login(code: string): Observable<UserModel> {
    return this.github.getAccessToken(code, client_id, client_secret).pipe(
      tap(accessToken => this.accessToken = accessToken),
      switchMap(accessToken => this.github.getCurrentUser(accessToken)),
    );
  }

  isCommentByIssueAuthor(comment: Issue | IssueComment): boolean {
    return comment.id !== this.firstIssue.id && this.firstIssue.author.login === comment.author.login;
  }

  addIssueOrComment(): Observable<QueryIssuesQuery> {
    if (this.noIssue) {
      return this.createIssue(this.editingText).pipe(tap(() => this.editingText = ''));
    } else {
      return this.addComment(this.editingText).pipe(tap(() => this.editingText = ''));
    }
  }

  quote(body: string): void {
    this.editingText = body.replace(/^/mg, '> ') + '\n';
  }
}
