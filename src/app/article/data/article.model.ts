import { ArticleHistoryModel } from './article.history.model';
import { AuthorModel } from '../../author/data/author.model';

export class ArticleModel {
  id: string;
  type = 'article';
  title: string;
  level: number;
  path: string;
  filename: string;
  content: string;
  author: AuthorModel;
  creationDate: Date;
  lastUpdated: Date;
  history: ArticleHistoryModel[] = [];
}
