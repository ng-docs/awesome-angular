import { expect } from 'chai';
import {
  buildArticleTree,
  buildUuid,
  findFilesWithDuplicateIds,
  parseAuthor,
  parseCommit,
  splitGitLog,
} from './builder';
import { FileCommitModel } from './file-commit.model';
import { FileModel } from './file.model';
import { pathListToTree } from './utils';
import { ArticleModel } from '../../src/app/article/data/article.model';

const log = `commit 303bcb286e7fea09fa5814e68b6384f36cf1d234
Author: Zhicheng Wang <zcwang@thoughtworks.com>
Date:   Fri Sep 28 10:30:14 2018 +0800

    docs: 微前端概述文字调整

    这是一个测试

commit 02834efd68bba1352a3dbaaf100f6c71ba4b9b99
Author: Zhicheng Wang <zcwang@thoughtworks.com>
Date:   Fri Sep 28 10:29:02 2018 +0800

    chore: 调整应用结构

commit 8ce1f133ef5f6acf947814c5654fa1be4f5f535f
Author: Zhicheng Wang <zcwang@thoughtworks.com>
Date:   Sun Sep 23 13:17:05 2018 +0800

    feat: 改进布局

commit 3e892ab0ae466cb4ddfa088827bc909cd180e5b5
Author: Zhicheng Wang <zcwang@thoughtworks.com>
Date:   Wed Sep 19 15:33:13 2018 +0800

    docs: 微前端概述
`;

describe('test', () => {
  it('should split git log', function () {
    expect(splitGitLog(log)[0]).to.eql(`commit 303bcb286e7fea09fa5814e68b6384f36cf1d234
Author: Zhicheng Wang <zcwang@thoughtworks.com>
Date:   Fri Sep 28 10:30:14 2018 +0800

    docs: 微前端概述文字调整

    这是一个测试`);

    expect(splitGitLog(log)[1]).to.eql(`commit 02834efd68bba1352a3dbaaf100f6c71ba4b9b99
Author: Zhicheng Wang <zcwang@thoughtworks.com>
Date:   Fri Sep 28 10:29:02 2018 +0800

    chore: 调整应用结构`);
  });

  it('should parse git entry', function () {
    expect(parseCommit(`commit 303bcb286e7fea09fa5814e68b6384f36cf1d234
Author: Zhicheng Wang <zcwang@thoughtworks.com>
Date:   Fri Sep 28 10:30:14 2018 +0800

    docs: 微前端概述文字调整

    这是一个测试

`)).to.eql({
      rev: '303bcb286e7fea09fa5814e68b6384f36cf1d234',
      author: 'Zhicheng Wang <zcwang@thoughtworks.com>',
      date: new Date('Fri Sep 28 10:30:14 2018 +0800'),
      message: 'docs: 微前端概述文字调整',
      details: '这是一个测试',
    });
  });

  it('should build uuid', function () {
    const commit: FileCommitModel = {
      author: '',
      date: new Date(),
      details: '',
      message: 'docs: 微前端文字调整；测试; test/-test',
      rev: '371a',
    };
    expect(buildUuid(commit)).to.eql('371a_微前端文字调整_测试__test_-test');
  });

  it('should check duplicated files', function () {
    const file1 = new FileModel();
    file1.id = 'a';
    const file2 = new FileModel();
    file2.id = 'b';
    const file3 = new FileModel();
    file3.id = 'a';
    const files = findFilesWithDuplicateIds([file1, file2, file3]);
    expect(files).to.eql([file3]);
  });

  it('should parse author', function () {
    const joinTime = new Date();
    const author = parseAuthor('/tmp/汪志成.md', `邮箱：asnowwolf@gmail.com, zcwang@thoughtworks.com

---

## 简介

## 作品

`, joinTime);
    expect(author).to.eql({
      emails: ['asnowwolf@gmail.com', 'zcwang@thoughtworks.com'],
      name: '汪志成',
      profile: `## 简介

## 作品`,
      joinTime: joinTime,
    });
  });

  it('should build tree from path list', function () {
    const pathList = [
      '',
      '/a',
      '/a/b',
    ];
    expect(pathListToTree(pathList)).to.eql([{
      path: '',
      title: '',
      children: [
        {
          path: '/a',
          title: 'a',
          children: [
            {
              title: 'b',
              path: '/a/b',
              children: [],
            },
          ],
        },
      ],
    }]);
  });
  it('should build article groups', function () {
    const article1 = new ArticleModel();
    article1.id = '1';
    article1.path = '/a/b';
    article1.filename = '10.md';
    article1.creationDate = new Date('2018-02-01');
    const article2 = new ArticleModel();
    article2.id = '2';
    article2.path = '';
    article2.creationDate = new Date('2018-01-01');
    const article3 = new ArticleModel();
    article3.id = '3';
    article3.filename = '2.md';
    article3.path = '/a/b';
    article3.creationDate = new Date('2018-03-01');
    const article4 = new ArticleModel();
    article4.id = '4';
    article4.path = '/a';
    article4.creationDate = new Date('2018-04-01');

    const tree = buildArticleTree([article1, article2, article3, article4]);
    expect(tree).to.eql(
      {
        children: [
          {
            history: [],
            id: '2',
            path: '',
            creationDate: new Date('2018-01-01T00:00:00.000Z'),
          },
          {
            children: [
              {
                children: [
                  {
                    history: [],
                    id: '3',
                    path: '/a/b',
                    filename: '2.md',
                    creationDate: new Date('2018-03-01T00:00:00.000Z'),
                  },
                  {
                    history: [],
                    id: '1',
                    path: '/a/b',
                    filename: '10.md',
                    creationDate: new Date('2018-02-01T00:00:00.000Z'),
                  },
                ],
                title: 'b',
                path: '/a/b',
                creationDate: new Date('2018-02-01T00:00:00.000Z'),
              },
              {
                history: [],
                id: '4',
                path: '/a',
                creationDate: new Date('2018-04-01T00:00:00.000Z'),
              },
            ],
            title: 'a',
            path: '/a',
            creationDate: new Date('2018-02-01T00:00:00.000Z'),
          },
        ],
        title: '',
        path: '',
        creationDate: new Date('2018-01-01T00:00:00.000Z'),
      },
    );
  });
});
