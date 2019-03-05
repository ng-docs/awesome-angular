import {ArticleHistoryModel} from './article.history.model';
import {ArticleGroupModel} from './article-group.model';

export class ArticleModel {
  id: string;
  type = 'article';
  title: string;
  level: number;
  path: string;
  filename: string;
  content: string;
  isCover = false;
  isTranslation = false;
  group?: ArticleGroupModel;
  author: string;
  reviewers: string[];
  creationDate: Date;
  lastUpdated?: Date;
  history: ArticleHistoryModel[] = [];
}
