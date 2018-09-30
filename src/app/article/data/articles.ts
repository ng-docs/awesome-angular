import { ArticleGroupModel } from './article-group.model';

declare function require(name: string): any;

export const articles: ArticleGroupModel = require('./articles.json');
