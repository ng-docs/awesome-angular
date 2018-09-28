export interface DirTreeModel {
  path: string;
  name: string;
  isFile: boolean;
  isDirectory: boolean;
  children: DirTreeModel[];
}
