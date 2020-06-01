import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AddCommentGQL,
  AddCommentMutation,
  AddReactionGQL,
  AddReactionMutation,
  CreateIssueGQL,
  CreateIssueMutation,
  QueryIssuesGQL,
  QueryIssuesQuery,
  QueryRepositoryGQL,
  QueryRepositoryQuery,
  ReactionContent,
  RemoveReactionGQL,
  RemoveReactionMutation,
  UpdateIssueCommentGQL,
  UpdateIssueCommentMutation,
  UpdateIssueGQL,
  UpdateIssueMutation,
} from '../../../../types';
import { Query } from './query';
import { UserModel } from './user.model';

function optionsWith(accessToken: string) {
  if (!accessToken) {
    return;
  }

  return {
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  };
}

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private http: HttpClient,
              private gqlQueryIssue: QueryIssuesGQL,
              private gqlQueryRepository: QueryRepositoryGQL,
              private qglCreateIssue: CreateIssueGQL,
              private qglUpdateIssue: UpdateIssueGQL,
              private gqlAddComment: AddCommentGQL,
              private gqlUpdateComment: UpdateIssueCommentGQL,
              private gqlAddReaction: AddReactionGQL,
              private gqlRemoveReaction: RemoveReactionGQL,
  ) {
  }

  getAccessToken(code: string, clientId: string, clientSecret: string): Observable<string> {
    return this.http.post('https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token', {
      code,
      client_id: clientId,
      client_secret: clientSecret,
    }, { responseType: 'text' }).pipe(
      map(data => {
        const resp = Query.parse(data);
        if (resp.error) {
          throw resp;
        } else {
          return resp.access_token;
        }
      }),
    );
  }

  getCurrentUser(accessToken: string): Observable<UserModel> {
    return this.http.get<UserModel>(`https://api.github.com/user`, { headers: { Authorization: `token ${accessToken}` } });
  }

  queryRepository(owner: string, name: string, accessToken: string): Observable<QueryRepositoryQuery> {
    return this.gqlQueryRepository.fetch({
      owner,
      name,
    }, optionsWith(accessToken)).pipe(map(resp => resp.data));
  }

  queryIssues(owner: string, repo: string, keyword: string, accessToken: string): Observable<QueryIssuesQuery> {
    return this.gqlQueryIssue.fetch({
      filter: `repo:${owner}/${repo} is:open ${keyword}`,
    }, { fetchPolicy: 'no-cache', ...optionsWith(accessToken) }).pipe(map(resp => resp.data));
  }

  createIssue(repositoryId: string, title: string, body: string, accessToken: string): Observable<CreateIssueMutation> {
    return this.qglCreateIssue.mutate({
      repositoryId,
      title,
      body,
    }, optionsWith(accessToken)).pipe(map(resp => resp.data));
  }

  updateIssue(issueId: string, body: string, accessToken: string): Observable<UpdateIssueMutation> {
    return this.qglUpdateIssue.mutate({
      id: issueId,
      body,
    }, optionsWith(accessToken)).pipe(map(resp => resp.data));
  }

  updateComment(commentId: string, body: string, accessToken: string): Observable<UpdateIssueCommentMutation> {
    return this.gqlUpdateComment.mutate({
      id: commentId,
      body,
    }, optionsWith(accessToken)).pipe(map(resp => resp.data));
  }

  addComment(issueId: string, body: string, accessToken: string): Observable<AddCommentMutation> {
    return this.gqlAddComment.mutate({
      subjectId: issueId,
      body,
    }, optionsWith(accessToken)).pipe(map(resp => resp.data));
  }

  addReaction(subjectId: string, content: ReactionContent, accessToken: string): Observable<AddReactionMutation> {
    return this.gqlAddReaction.mutate({
      subjectId,
      content,
    }, optionsWith(accessToken)).pipe(map(resp => resp.data));
  }

  removeReaction(subjectId: string, content: ReactionContent, accessToken: string): Observable<RemoveReactionMutation> {
    return this.gqlRemoveReaction.mutate({
      subjectId,
      content,
    }, optionsWith(accessToken)).pipe(map(resp => resp.data));
  }
}


