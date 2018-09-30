import { ArticleModel } from './article.model';

export class ArticleGroupModel {
  id: string;
  type = 'group';
  title: string;
  level: number;
  path: string;
  creationDate?: Date;
  children: (ArticleGroupModel | ArticleModel)[] = [];
}
