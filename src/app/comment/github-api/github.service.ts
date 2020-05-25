import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { GetIssuesGQL, GetIssuesQuery } from '../../../types';
import { Query } from './query';
import { UserModel } from './user.model';

const client_id = environment.clientId;
const client_secret = environment.clientSecret;
const KEY_ACCESS_TOKEN = 'accessToken';

function escapeKeyword(label: string): string {
  if (!label) {
    return '';
  }
  return '#' + label.replace(/#/g, '\\x23') + '#';
}

function unescapeKeyword(label: string): string {
  return label.replace(/^#(.*)#$/, '$1').replace(/\\x23/g, '#');
}

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  get accessToken(): string {
    return localStorage.getItem(KEY_ACCESS_TOKEN);
  }

  set accessToken(value: string) {
    localStorage.setItem(KEY_ACCESS_TOKEN, value);
  }

  constructor(private http: HttpClient, private issuesQuery: GetIssuesGQL) {
  }

  get loginUrl(): string {
    const oauthUri = 'https://github.com/login/oauth/authorize';
    const oauthParams = {
      scope: 'public_repo',
      redirect_uri: 'http://localhost:4202/comments/landing',
      client_id,
      client_secret,
    };

    return `${oauthUri}${Query.stringify(oauthParams)}`;
  }

  login(code: string): Observable<string> {
    return this.http.post('https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token', {
      code,
      client_id,
      client_secret,
    }, { responseType: 'text' }).pipe(
      tap(data => {
        const resp = Query.parse(data);
        if (resp.error) {
          throw resp;
        } else {
          this.accessToken = resp.access_token;
        }
      }),
      map(() => this.accessToken),
    );
  }

  getCurrentUser(): Observable<UserModel> {
    return this.http.get<UserModel>(`https://api.github.com/user`, { headers: { Authorization: `token ${this.accessToken}` } });
  }

  queryIssues(owner: string, repo: string, label: string): Observable<GetIssuesQuery> {
    return this.issuesQuery.fetch({
      filter: `repo:${owner}/${repo} is:open ${escapeKeyword(label)}`,
    }, {
      context: {
        headers: {
          authorization: this.accessToken ? `Bearer ${this.accessToken}` : '',
        },
      },
    }).pipe(map(resp => resp.data));
  }
}


