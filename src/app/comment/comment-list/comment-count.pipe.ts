import { Pipe, PipeTransform } from '@angular/core';
import { QIssue } from '../services/github-api/q-types';

@Pipe({
  name: 'commentCount',
})
export class CommentCountPipe implements PipeTransform {

  transform(issues: QIssue[]): number {
    return issues.length +
      issues.map(it => it.comments.nodes.length).reduce((prev, length) => prev + length, 0);
  }

}
