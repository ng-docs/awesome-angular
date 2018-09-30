import { ArticleGroupModel } from './article-group.model';
import { ArticleModel } from './article.model';

declare function require(name: string): any;

export const articles: ArticleGroupModel = require('./articles.json');

function flatten(items: ArticleGroupModel): ArticleModel[] {
  const result = [];
  items.children.forEach(item => {
    if (item.type === 'article') {
      result.push(item as ArticleModel);
    } else if (item.type === 'group') {
      result.push(...flatten(item as ArticleGroupModel));
    }
  });
  return result;
}

export const flattenArticles = flatten(articles);

export function findArticleById(id: string): ArticleModel {
  return flattenArticles.find(it => it.id === id);
}
