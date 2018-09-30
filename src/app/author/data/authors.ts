import { AuthorModel } from './author.model';

declare function require(name: string): any;

export const authors: AuthorModel[] = require('./authors.json');

export function findAuthorByName(name: string): AuthorModel {
  return authors.find(it => it.name === name);
}
