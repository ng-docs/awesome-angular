import { ArticleModel } from './article.model';

declare function require(name: string): any;

export const articles: ArticleModel[] = require('./tree.json');
