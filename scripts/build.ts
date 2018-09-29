import * as glob from 'glob';
import * as spawn from 'cross-spawn';
import * as fs from 'fs';

import { findFilesWithDuplicateIds, parseAuthor, parseLog } from './utils/tree-builder';
import { FileModel } from './utils/file.model';
import { AuthorModel } from '../src/app/author/data/author.model';
import { ArticleModel } from '../src/app/article/data/article.model';
import { ArticleHistoryModel } from '../src/app/article/data/article.history.model';
import { FileCommitModel } from './utils/file-commit.model';

function parseFile(filename: string): FileModel {
  const result = spawn.sync('git', ['log', '--follow', filename]).stdout as Buffer;
  return parseLog(filename, result.toString('utf-8'));
}

function lastOf<T>(items: T[]): T {
  if (items && items.length) {
    return items[items.length - 1];
  }
}

function firstOf<T>(items: T[]): T {
  if (items && items.length) {
    return items[0];
  }
}

function parseFiles(fileNames: string[]): FileModel[] {
  return fileNames.map(parseFile).sort((a, b) => {
    return lastOf(b.commits).date.getTime() - lastOf(a.commits).date.getTime();
  });
}

function findAuthor(authors: AuthorModel[], gitAuthor: string): AuthorModel {
  return authors.find(author => author.emails.indexOf(emailOf(gitAuthor)) !== -1);
}

function buildArticleHistory(commit: FileCommitModel, authors: AuthorModel[]): ArticleHistoryModel {
  const history = new ArticleHistoryModel();
  history.date = commit.date;
  history.message = commit.message;
  history.details = commit.details;
  history.author = findAuthor(authors, commit.author);
  return history;
}

function buildArticle(file: FileModel, authors: AuthorModel[]): ArticleModel {
  const result = new ArticleModel();
  result.id = file.id;
  result.title = file.title;
  result.creationDate = lastOf(file.commits).date;
  result.lastUpdated = firstOf(file.commits).date;
  result.content = fs.readFileSync(file.path, 'utf-8');
  result.history = file.commits.map(commit => buildArticleHistory(commit, authors));
  const authorId = lastOf(file.commits).author;
  result.author = findAuthor(authors, authorId);

  return result;
}

function buildArticles(fileNames: string[], authors: AuthorModel[]): ArticleModel[] {
  const files = parseFiles(fileNames);

  const conflictFiles = findFilesWithDuplicateIds(files);
  if (conflictFiles.length > 0) {
    console.error('Found some files with duplicate ids: ', conflictFiles.map(file => file.id));
    throw new Error('Build Failed!');
  }

  return files.map(file => buildArticle(file, authors));
}

function buildAuthors(fileNames: string[]): AuthorModel[] {
  return parseFiles(fileNames)
    .map((file) => {
      const content = fs.readFileSync(file.path, 'utf-8');
      return parseAuthor(file.path, content, lastOf(file.commits).date);
    });

}

function emailOf(titleAndMail: string): string {
  return titleAndMail.replace(/^.*?<(.*?)>/, '$1');
}

export function buildAll(): void {
  const authors = buildAuthors(glob.sync('./src/assets/content/authors/**/*.md'));
  fs.writeFileSync('./src/app/author/data/tree.json', JSON.stringify(authors, null, 2), 'utf-8');

  const articles = buildArticles(glob.sync('./src/assets/content/articles/**/*.md'), authors);
  fs.writeFileSync('./src/app/article/data/tree.json', JSON.stringify(articles, null, 2), 'utf-8');
}

buildAll();
