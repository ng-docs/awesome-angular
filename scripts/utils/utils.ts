import { ArticleGroupModel } from '../../src/app/article/data/article-group.model';

export function lastOf<T>(items: T[]): T {
  if (items && items.length) {
    return items[items.length - 1];
  }
}

export function firstOf<T>(items: T[]): T {
  if (items && items.length) {
    return items[0];
  }
}

export function emailOf(titleAndMail: string): string {
  return titleAndMail.replace(/^.*?<(.*?)>/, '$1');
}

function createNode(basePath: string, path: string[], tree: ArticleGroupModel[]): void {
  const name = path.shift();
  const idx = tree.findIndex(function (e) {
    return e.title === name;
  });
  const currentPath = basePath + '/' + name;
  if (idx < 0) {
    const group = new ArticleGroupModel();
    group.id = name.replace(/[^-\u4e00-\u9fa5\w]/g, '_');
    group.title = name;
    group.path = currentPath.replace(/^\//, '');
    group.children = [];
    tree.push(group);
    if (path.length !== 0) {
      createNode(currentPath, path, tree[tree.length - 1].children as ArticleGroupModel[]);
    }
  } else {
    createNode(currentPath, path, tree[idx].children as ArticleGroupModel[]);
  }
}

export function pathListToTree(data: string[]): ArticleGroupModel[] {
  const tree = [];
  for (let i = 0; i < data.length; i++) {
    const path = data[i];
    const split = path.split('/');
    createNode('', split, tree);
  }
  return tree;
}
