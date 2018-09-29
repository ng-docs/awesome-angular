import { difference, uniqBy } from 'lodash';
import * as fs from 'fs';
import { AuthorModel } from '../../src/app/author/data/author.model';
import * as path from 'path';
import { FileCommitModel } from './file-commit.model';
import { FileModel } from './file.model';

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
