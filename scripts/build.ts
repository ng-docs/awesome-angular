import * as glob from 'glob';
import * as fs from 'fs';
import { buildArticles, buildAuthors } from './utils/builder';

function buildAll(): void {
  const authors = buildAuthors(glob.sync('./src/assets/content/authors/**/*.md'));
  fs.writeFileSync('./src/app/author/data/tree.json', JSON.stringify(authors, null, 2), 'utf-8');

  const articles = buildArticles(glob.sync('./src/assets/content/articles/**/*.md'), authors);
  fs.writeFileSync('./src/app/article/data/tree.json', JSON.stringify(articles, null, 2), 'utf-8');
}

buildAll();
