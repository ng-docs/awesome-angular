import { ArticleGroupModel } from './article-group.model';
import { ArticleModel } from './article.model';

declare function require(name: string): any;

export const articles: ArticleGroupModel = require('./articles.json');

function flatten(group: ArticleGroupModel): ArticleModel[] {
  const result = [];
  group.children.forEach(it => {
    if (it.type === 'article') {
      const article = it as ArticleModel;
      article.group = group;
      result.push(article);
    } else if (it.type === 'group') {
      result.push(...flatten(it as ArticleGroupModel));
    }
  });
  return result;
}

export const flattenArticles = flatten(articles);

export function findArticleById(id: string): ArticleModel {
  return flattenArticles.find(it => it.id === id);
}
