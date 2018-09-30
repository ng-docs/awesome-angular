import { ArticleGroupModel } from './article-group.model';
import { ArticleModel } from './article.model';

declare function require(name: string): any;

export const articles: ArticleGroupModel = require('./articles.json');

function findArticle(article: (ArticleModel | ArticleGroupModel), id: string): ArticleModel {
  if (article.id === id) {
    return article as ArticleModel;
  } else if (article.type === 'group') {
    return (article as ArticleGroupModel).children.find(it => !!findArticle(it, id)) as ArticleModel;
  }
}

export function findArticleById(id: string): ArticleModel {
  return findArticle(articles, id);
}
