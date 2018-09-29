import { AuthorModel } from './author.model';

declare function require(name: string): any;

export const authors: AuthorModel[] = require('./tree.json');
