import * as glob from 'glob';
import * as fs from 'fs';
import { buildArticles, buildArticleTree, buildAuthors } from './utils/builder';

function buildAll(): void {
  const authors = buildAuthors(glob.sync('./src/assets/content/authors/**/*.md'));
  fs.writeFileSync('./src/app/author/data/authors.json', JSON.stringify(authors, null, 2), 'utf-8');

  const articles = buildArticles(glob.sync('./src/assets/content/articles/**/*.md'), authors);

  const articleGroups = buildArticleTree(articles);
  fs.writeFileSync('./src/app/article/data/articles.json', JSON.stringify(articleGroups, null, 2), 'utf-8');
}

buildAll();
