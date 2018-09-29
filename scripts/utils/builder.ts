import { difference, uniqBy } from 'lodash';
import * as fs from 'fs';
import { AuthorModel } from '../../src/app/author/data/author.model';
import * as path from 'path';
import { FileCommitModel } from './file-commit.model';
import { FileModel } from './file.model';
import { ArticleHistoryModel } from '../../src/app/article/data/article.history.model';
import { ArticleModel } from '../../src/app/article/data/article.model';
import * as spawn from 'cross-spawn';
import { emailOf, firstOf, lastOf } from './utils';

export function parseCommit(gitLogEntry: string): FileCommitModel {
  const result = new FileCommitModel();
  const matches = gitLogEntry.match(/^commit (\w+)\nAuthor: (.*)\nDate: (.*)\n\n(.*)\n?([\s\S]*)/);
  result.rev = matches[1].trim();
  result.author = matches[2].trim();
  result.date = new Date(matches[3].trim());
  result.message = matches[4].trim();
  result.details = matches[5].trim();
  return result;
}

export function parseLog(filename: string, gitLog: string): FileModel {
  const result = new FileModel();
  result.path = filename;

  const entries = splitGitLog(gitLog);
  const commits = result.commits = entries.map(parseCommit);
  result.id = buildUuid(commits[commits.length - 1]);
  result.title = extractTitle(filename) || result.id;
  return result;
}

function extractTitle(filename: string): string {
  const content = fs.readFileSync(filename, 'utf-8');
  return content.replace(/^#\s+(.*)\n[\s\S]*/, '$1');
}

export function splitGitLog(log: string): string[] {
  return log.split(/\n(?=commit )/).map(entry => entry.trim());
}

export function buildUuid(commit: FileCommitModel): string {
  const initialTitle = commit.message.replace(/^[\w()]+:\s+/, '').replace(/[^-\u4e00-\u9fa5\w]/g, '_');
  const shortRev = commit.rev.slice(0, 8);
  return `${shortRev}_${initialTitle}`;
}

export function findFilesWithDuplicateIds(files: FileModel[]): FileModel[] {
  const uniqueFiles = uniqBy(files, 'id');
  return difference(files, uniqueFiles);
}

export function parseAuthor(filename: string, content: string, joinTime: Date): AuthorModel {
  const author = new AuthorModel();
  author.name = path.basename(filename, '.md').trim();
  author.joinTime = joinTime;
  const matches = content.match(/^邮箱([：:])(.*)$/m);
  if (matches) {
    author.emails = matches[2].split(/[;,；，]/g).map(email => email.trim());
  }
  author.profile = content.replace(/^[\s\S]*?\n--+\n/, '').trim();
  return author;
}

function parseFile(filename: string): FileModel {
  const result = spawn.sync('git', ['log', '--follow', filename]).stdout as Buffer;
  return parseLog(filename, result.toString('utf-8'));
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
  result.paths = file.path
    .replace('./src/assets/content/articles/', '')
    .replace(/.md$/, '')
    .split('/')
    .slice(0, -1);
  result.creationDate = lastOf(file.commits).date;
  result.lastUpdated = firstOf(file.commits).date;
  result.content = fs.readFileSync(file.path, 'utf-8');
  result.history = file.commits.map(commit => buildArticleHistory(commit, authors));
  const authorId = lastOf(file.commits).author;
  result.author = findAuthor(authors, authorId);

  return result;
}

export function buildArticles(fileNames: string[], authors: AuthorModel[]): ArticleModel[] {
  const files = parseFiles(fileNames);

  const conflictFiles = findFilesWithDuplicateIds(files);
  if (conflictFiles.length > 0) {
    console.error('Found some files with duplicate ids: ', conflictFiles.map(file => file.id));
    throw new Error('Build Failed!');
  }

  return files.map(file => buildArticle(file, authors));
}

export function buildAuthors(fileNames: string[]): AuthorModel[] {
  return parseFiles(fileNames)
    .map((file) => {
      const content = fs.readFileSync(file.path, 'utf-8');
      return parseAuthor(file.path, content, lastOf(file.commits).date);
    });
}

