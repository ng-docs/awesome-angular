import { GetViewerQuery } from '../../../../types';
import { DiscussService } from '../discuss.service';

export type QViewer = GetViewerQuery['viewer'];
export type QIssue = DiscussService['issues'][0];
