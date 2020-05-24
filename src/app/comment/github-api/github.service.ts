import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Query } from './query';
import { UserModel } from './user.model';

const client_id = '368f9cfbcc6b3fcb6c30';
const client_secret = '98e1ef218845db7565b455b81edb5261415a9992';
const KEY_ACCESS_TOKEN = 'accessToken';

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

  constructor(private http: HttpClient) {
  }

  get loginUrl(): string {
    const oauthUri = 'https://github.com/login/oauth/authorize';
    const oauthParams = {
      scope: 'public_repo',
      redirect_uri: 'http://localhost:4202/comments/landing',
      client_id: client_id,
      client_secret: client_secret,
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
}

