import { ArticleHistoryModel } from './article.history.model';
import { AuthorModel } from '../../author/data/author.model';

export class ArticleModel {
  id: string;
  title: string;
  content: string;
  author: AuthorModel;
  creationDate: Date;
  lastUpdated: Date;
  history: ArticleHistoryModel[] = [];
}
