import { AuthorModel } from '../../author/data/author.model';

export class ArticleHistoryModel {
  author: AuthorModel;
  date: Date;
  message: string;
  details: string;
}
