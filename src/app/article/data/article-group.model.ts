import { ArticleModel } from './article.model';

export class ArticleGroupModel {
  id: string;
  type = 'group';
  summary?: string;
  title: string;
  level: number;
  path: string;
  creationDate?: Date;
  children: (ArticleGroupModel | ArticleModel)[] = [];
}
