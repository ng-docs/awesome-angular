import { Pipe, PipeTransform } from '@angular/core';
import { Issue, QueryIssuesQuery } from '../../../types';

@Pipe({
  name: 'commentCount',
})
export class CommentCountPipe implements PipeTransform {

  transform(issues: QueryIssuesQuery['search']['nodes']): number {
    return issues.length +
      issues.map(it => (it as Issue).comments.nodes.length).reduce((prev, length) => prev + length, 0);
  }

}
