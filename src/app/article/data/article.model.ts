import { ArticleHistoryModel } from './article.history.model';

export class ArticleModel {
  id: string;
  type = 'article';
  title: string;
  level: number;
  path: string;
  filename: string;
  content: string;
  author: string;
  reviewers: string[];
  creationDate: Date;
  lastUpdated?: Date;
  history: ArticleHistoryModel[] = [];
}
