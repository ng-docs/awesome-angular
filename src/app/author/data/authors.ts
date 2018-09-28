import { DirTreeModel } from '../../utils/dir-tree.model';

declare function require(name: string): any;

export const authors: DirTreeModel = require('./json');
