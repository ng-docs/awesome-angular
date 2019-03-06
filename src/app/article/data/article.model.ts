import { ArticleHistoryModel } from './article.history.model';
import { ArticleGroupModel } from './article-group.model';

export class ArticleModel {
  id: string;
  type = 'article';
  title: string;
  originTitle: string;
  level: number;
  path: string;
  filename: string;
  content: string;
  group?: ArticleGroupModel;
  author: string;
  reviewers: string[];
  creationDate: Date;
  lastUpdated?: Date;
  history: ArticleHistoryModel[] = [];
}

export function articleIsCover(article: ArticleModel): boolean {
  return ['0.md', 'cover.md', '_cover.md'].indexOf(article.filename) !== -1;
}

export function articleIsTranslation(article: ArticleModel): boolean {
  return !!article.originTitle;
}
