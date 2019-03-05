import {difference, min, uniq, uniqBy} from 'lodash';
import * as fs from 'fs';
import {AuthorModel} from '../../src/app/author/data/author.model';
import * as path from 'path';
import {FileCommitModel} from './file-commit.model';
import {FileModel} from './file.model';
import {ArticleHistoryModel} from '../../src/app/article/data/article.history.model';
import {articleIsCover, ArticleModel} from '../../src/app/article/data/article.model';
import * as spawn from 'cross-spawn';
import {emailOf, firstOf, lastOf, pathListToTree} from './utils';
import {ArticleGroupModel} from '../../src/app/article/data/article-group.model';

export function parseCommit(gitLogEntry: string): FileCommitModel {
  const result = new FileCommitModel();
  const matches = gitLogEntry.match(/^commit (\w+)\nAuthor: (.*)\nDate: (.*)\n\n(.*)\n?([\s\S]*)/);
  if (!matches) {
    console.error('Please commit all newly created documents first!');
    console.error('请先提交所有新建的文档。');
    process.exit(3);
  }
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
  const {chineseTitle, englishTitle} = extractTitles(filename);
  result.title = chineseTitle;
  result.originTitle = englishTitle;
  return result;
}

function extractTitles(filename: string): { englishTitle?: string, chineseTitle?: string } {
  const content = fs.readFileSync(filename, 'utf-8');
  // 先尝试按照中英对照的方式提取标题，再尝试按照纯中文的方式提取标题
  const matches = content.match(/^[\s\S]*?#\s+(.*)\n\n#\s+(.*)/) || content.match(/^[\s\S]*?#\s+(.*)/);
  if (!matches) {
    return {};
  } else if (matches.length === 2) {
    return {chineseTitle: matches[1]};
  } else if (matches.length === 3) {
    return {chineseTitle: matches[2], englishTitle: matches[1]};
  }
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
  if (!result) {
    throw new Error('Please commit all newly created documents ONE-BY-ONE first!');
  }
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
  history.author = findAuthor(authors, commit.author).name;
  return history;
}

function buildArticle(file: FileModel, authors: AuthorModel[]): ArticleModel {
  const result = new ArticleModel();
  result.id = file.id;
  result.title = file.title;
  result.originTitle = file.originTitle;
  result.path = file.path
    .replace('./src/assets/content/articles/', '')
    .replace(/.md$/, '')
    .split('/')
    .slice(0, -1)
    .join('/');
  if (result.path !== '') {
    result.path = '/' + result.path;
  }
  result.filename = file.path.replace(/^.*\/(.*)$/, '$1');
  const creationDate = lastOf(file.commits).date;
  result.creationDate = creationDate;
  const lastUpdated = firstOf(file.commits).date;
  if (creationDate !== lastUpdated) {
    result.lastUpdated = lastUpdated;
  }
  result.content = fs.readFileSync(file.path, 'utf-8');
  result.history = file.commits.map(commit => buildArticleHistory(commit, authors));
  const authorId = lastOf(file.commits).author;
  result.author = findAuthor(authors, authorId).name;
  result.reviewers = difference(uniq(file.commits.map(commit => findAuthor(authors, commit.author).name)), [result.author]);

  return result;
}

export function buildArticles(filenames: string[], authors: AuthorModel[]): ArticleModel[] {
  const files = parseFiles(filenames);

  const conflictFiles = findFilesWithDuplicateIds(files);
  if (conflictFiles.length > 0) {
    console.error('Found some files with duplicate ids: ', conflictFiles.map(file => file.id));
    throw new Error('Build Failed!');
  }

  return files.map(file => buildArticle(file, authors));
}

export function buildAuthors(filenames: string[]): AuthorModel[] {
  return parseFiles(filenames)
    .map((file) => {
      const content = fs.readFileSync(file.path, 'utf-8');
      return parseAuthor(file.path, content, lastOf(file.commits).date);
    });
}

function isSamePath(path1: string, path2: string): boolean {
  return path1.replace(/^\//, '') === path2.replace(/^\//, '');
}

function addArticlesToGroups(articles: ArticleModel[], articleGroups: ArticleGroupModel[]): void {
  articleGroups.forEach(group => {
    addArticlesToGroups(articles, group.children as ArticleGroupModel[]);
    const subArticles = articles
      .filter(it => it.type === 'article')
      .filter(it => isSamePath(it.path, group.path));
    subArticles.forEach(it => it.level = group.level + 1);
    const coverArticle = subArticles.find(articleIsCover);
    if (coverArticle) {
      group.title = coverArticle.title;
      group.originTitle = coverArticle.originTitle;
      coverArticle.title = subTitleOf(coverArticle.content).chineseTitle || '专栏简介';
      group.id = coverArticle.id;
      group.summary = coverArticle.content;
    }
    group.children.push(...subArticles);
  });
}

function subTitleOf(content: string): { englishTitle?: string, chineseTitle?: string } {
  const matches = content.match(/^[\s\S]*?##\s+(.*)\n\n##\s+(.*)/) || content.match(/^[\s\S]*?##\s+(.*)/);
  if (!matches) {
    return {};
  } else if (matches.length === 2) {
    return {chineseTitle: matches[1]};
  } else if (matches.length === 3) {
    return {englishTitle: matches[1], chineseTitle: matches[2]};
  }
}

function fillCreationDateForGroups(groups: ArticleGroupModel[]): void {
  groups.forEach(group => {
    fillCreationDateForGroups(group.children.filter(it => it instanceof ArticleGroupModel) as ArticleGroupModel[]);
    group.creationDate = min(group.children.map(it => it.creationDate));
  });
}

function timeOf(a: ArticleModel): number {
  if (a.filename === 'welcome.md' && a.path === '') {
    return 0;
  }
  return a.creationDate.getTime();
}

function sortByCreationDate(a, b) {
  return timeOf(a) - timeOf(b);
}

function orderIdOf(article: ArticleModel | ArticleGroupModel): number {
  if (article instanceof ArticleModel) {
    const id = article.filename.replace(/^(\d+).*$/, '$1');
    if (id) {
      return +id;
    } else {
      return article.creationDate.getTime();
    }
  } else {
    return article.creationDate.getTime();
  }
}

function sortByFilename(a: ArticleModel | ArticleGroupModel, b: ArticleModel | ArticleGroupModel): number {
  return orderIdOf(a) - orderIdOf(b);
}

function sort(group: ArticleGroupModel): ArticleGroupModel {
  if (group.level > 0) {
    group.children = group.children.sort((a, b) => sortByFilename(a, b));
  } else {
    group.children = group.children.sort((a, b) => sortByCreationDate(a, b));
  }
  group.children.forEach(item => {
    if (item instanceof ArticleGroupModel) {
      sort(item);
    }
  });
  return group;
}

export function buildArticleTree(articles: ArticleModel[]): ArticleGroupModel {
  const paths = articles.map(it => it.path);
  const dirList = uniq(paths)
    .sort((a, b) => a.localeCompare(b));

  const result = pathListToTree(dirList);
  addArticlesToGroups(articles, result);
  fillCreationDateForGroups(result);
  return sort(result[0]);
}
