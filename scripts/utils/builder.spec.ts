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
      id: '',
      level: 0,
      type: 'group',
      path: '',
      title: '',
      children: [
        {
          id: 'a',
          level: 1,
          type: 'group',
          path: '/a',
          title: 'a',
          children: [
            {
              id: 'b',
              level: 2,
              title: 'b',
              type: 'group',
              path: '/a/b',
              children: [],
            },
          ],
        },
      ],
    }]);
  });
  it('should build article groups', function () {
    const article0 = new ArticleModel();
    article0.id = '0';
    article0.path = '/a/b';
    article0.title = 'group';
    article0.content = '# summary';
    article0.filename = '0.md';
    article0.creationDate = new Date('2018-02-01');
    const article1 = new ArticleModel();
    article1.id = '1';
    article1.path = '/a/b';
    article1.filename = '10.md';
    article1.creationDate = new Date('2018-02-01');
    const article2 = new ArticleModel();
    article2.id = '2';
    article2.path = '';
    article2.filename = '2.md';
    article2.creationDate = new Date('2018-01-01');
    const article3 = new ArticleModel();
    article3.id = '3';
    article3.filename = '2.md';
    article3.path = '/a/b';
    article3.creationDate = new Date('2018-03-01');
    const article4 = new ArticleModel();
    article4.id = '4';
    article4.path = '/a';
    article4.filename = '4.md';
    article4.creationDate = new Date('2018-04-01');

    const tree = buildArticleTree([article0, article1, article2, article3, article4]);
    expect(tree).to.eql(
      {
        'type': 'group',
        'children': [
          {
            'type': 'article',
            'isCover': false,
            'history': [],
            'id': '2',
            'path': '',
            'filename': '2.md',
            'creationDate': new Date('2018-01-01T00:00:00.000Z'),
            'level': 1,
          },
          {
            'type': 'group',
            'children': [
              {
                'type': 'group',
                title: 'group',
                summary: '# summary',
                'children': [
                  {
                    'type': 'article',
                    'isCover': true,
                    'history': [],
                    'id': '0',
                    title: 'group',
                    content: '# summary',
                    'path': '/a/b',
                    'filename': '0.md',
                    'creationDate': new Date('2018-02-01T00:00:00.000Z'),
                    'level': 3,
                  },
                  {
                    'type': 'article',
                    'isCover': false,
                    'history': [],
                    'id': '3',
                    'filename': '2.md',
                    'path': '/a/b',
                    'creationDate': new Date('2018-03-01T00:00:00.000Z'),
                    'level': 3,
                  },
                  {
                    'type': 'article',
                    'isCover': false,
                    'history': [],
                    'id': '1',
                    'path': '/a/b',
                    'filename': '10.md',
                    'creationDate': new Date('2018-02-01T00:00:00.000Z'),
                    'level': 3,
                  },
                ],
                'id': '0',
                'level': 2,
                'path': '/a/b',
                'creationDate': new Date('2018-02-01T00:00:00.000Z'),
              },
              {
                'type': 'article',
                'isCover': false,
                'history': [],
                'id': '4',
                'path': '/a',
                'filename': '4.md',
                'creationDate': new Date('2018-04-01T00:00:00.000Z'),
                'level': 2,
              },
            ],
            'id': 'a',
            'title': 'a',
            'level': 1,
            'path': '/a',
            'creationDate': new Date('2018-02-01T00:00:00.000Z'),
          },
        ],
        'id': '',
        'title': '',
        'level': 0,
        'path': '',
        'creationDate': new Date('2018-01-01T00:00:00.000Z'),
      },
    );
  });
  it('should build real data', function () {
    const a1 = new ArticleModel();
    Object.assign(a1, {
      'type': 'article',
      'isCover': false,
      'history': [
        {
          'date': new Date('2018-09-30T00:26:41.000Z'),
          'message': 'feat: 普通文件按照创建时间排序，系列文章按照文件名前部的数字排序',
          'details': '',
          'author': '汪志成',
        },
        {
          'date': new Date('2018-09-29T02:41:09.000Z'),
          'message': 'docs: 给 Java 程序员的 Angular 指南',
          'details': '',
          'author': '汪志成',
        },
      ],
      'id': '45c576d3_给_Java_程序员的_Angular_指南',
      'title': '你的职业生涯',
      'path': '/给 Java 程序员的 Angular 指南',
      'filename': '1.md',
      'creationDate': new Date('2018-09-29T02:41:09.000Z'),
      'lastUpdated': new Date('2018-09-30T00:26:41.000Z'),
      'content': '# 你的职业生涯\n\n\n',
      'author': '汪志成',
      'reviewers': [],
      'level': 2,
    });
    const a2 = new ArticleModel();
    Object.assign(a2, {
      'type': 'article',
      'isCover': false,
      'history': [
        {
          'date': new Date('2018-09-29T04:31:09.000Z'),
          'message': 'docs: 核心概念',
          'details': '',
          'author': '汪志成',
        },
      ],
      'id': '0d70dc60_核心概念',
      'title': '核心概念',
      'path': '/给 Java 程序员的 Angular 指南',
      'filename': '2.md',
      'creationDate': new Date('2018-09-29T04:31:09.000Z'),
      'content': '# 核心概念\n',
      'author': '汪志成',
      'reviewers': [],
      'level': 2,
    });
    const a3 = new ArticleModel();
    Object.assign(a3, {
      'type': 'article',
      'isCover': false,
      'history': [
        {
          'date': new Date('2018-09-29T04:31:25.000Z'),
          'message': 'docs: 测试驱动开发',
          'details': '',
          'author': '汪志成',
        },
      ],
      'id': 'aeb60f27_测试驱动开发',
      'title': '测试驱动开发',
      'path': '/给 Java 程序员的 Angular 指南',
      'filename': '10.md',
      'creationDate': new Date('2018-09-29T04:31:25.000Z'),
      'content': '# 测试驱动开发\n',
      'author': '汪志成',
      'reviewers': [],
      'level': 2,
    });
    const a4 = new ArticleModel();
    Object.assign(a4, {
      'type': 'article',
      'isCover': true,
      'history': [
        {
          'date': new Date('2018-09-30T13:34:40.000Z'),
          'message': 'docs: 给 Java 程序员的 Angular 系列教程',
          'details': '',
          'author': '汪志成',
        },
      ],
      'id': '46dcfe65_给_Java_程序员的_Angular_系列教程',
      'title': '给 Java 程序员的 Angular 系列教程',
      'path': '/给 Java 程序员的 Angular 指南',
      'filename': '0.md',
      'creationDate': new Date('2018-09-30T13:34:40.000Z'),
      'content': '# 给 Java 程序员的 Angular 系列教程\n\n',
      'author': '汪志成',
      'reviewers': [],
      'level': 2,
    });
    const tree = buildArticleTree([a1, a2, a3, a4]);
    expect(tree).to.eql({
      'type': 'group',
      'children': [
        {
          'type': 'group',
          'children': [
            {
              'type': 'article',
              'isCover': true,
              'history': [
                {
                  'date': new Date('2018-09-30T13:34:40.000Z'),
                  'message': 'docs: 给 Java 程序员的 Angular 系列教程',
                  'details': '',
                  'author': '汪志成',
                },
              ],
              'id': '46dcfe65_给_Java_程序员的_Angular_系列教程',
              'title': '给 Java 程序员的 Angular 系列教程',
              'path': '/给 Java 程序员的 Angular 指南',
              'filename': '0.md',
              'creationDate': new Date('2018-09-30T13:34:40.000Z'),
              'content': '# 给 Java 程序员的 Angular 系列教程\n\n',
              'author': '汪志成',
              'reviewers': [],
              'level': 2,
            },
            {
              'type': 'article',
              'isCover': false,
              'history': [
                {
                  'date': new Date('2018-09-30T00:26:41.000Z'),
                  'message': 'feat: 普通文件按照创建时间排序，系列文章按照文件名前部的数字排序',
                  'details': '',
                  'author': '汪志成',
                },
                {
                  'date': new Date('2018-09-29T02:41:09.000Z'),
                  'message': 'docs: 给 Java 程序员的 Angular 指南',
                  'details': '',
                  'author': '汪志成',
                },
              ],
              'id': '45c576d3_给_Java_程序员的_Angular_指南',
              'title': '你的职业生涯',
              'path': '/给 Java 程序员的 Angular 指南',
              'filename': '1.md',
              'creationDate': new Date('2018-09-29T02:41:09.000Z'),
              'lastUpdated': new Date('2018-09-30T00:26:41.000Z'),
              'content': '# 你的职业生涯\n\n\n',
              'author': '汪志成',
              'reviewers': [],
              'level': 2,
            },
            {
              'type': 'article',
              'isCover': false,
              'history': [
                {
                  'date': new Date('2018-09-29T04:31:09.000Z'),
                  'message': 'docs: 核心概念',
                  'details': '',
                  'author': '汪志成',
                },
              ],
              'id': '0d70dc60_核心概念',
              'title': '核心概念',
              'path': '/给 Java 程序员的 Angular 指南',
              'filename': '2.md',
              'creationDate': new Date('2018-09-29T04:31:09.000Z'),
              'content': '# 核心概念\n',
              'author': '汪志成',
              'reviewers': [],
              'level': 2,
            },
            {
              'type': 'article',
              'isCover': false,
              'history': [
                {
                  'date': new Date('2018-09-29T04:31:25.000Z'),
                  'message': 'docs: 测试驱动开发',
                  'details': '',
                  'author': '汪志成',
                },
              ],
              'id': 'aeb60f27_测试驱动开发',
              'title': '测试驱动开发',
              'path': '/给 Java 程序员的 Angular 指南',
              'filename': '10.md',
              'creationDate': new Date('2018-09-29T04:31:25.000Z'),
              'content': '# 测试驱动开发\n',
              'author': '汪志成',
              'reviewers': [],
              'level': 2,
            },
          ],
          'id': '46dcfe65_给_Java_程序员的_Angular_系列教程',
          'title': '给 Java 程序员的 Angular 系列教程',
          'level': 1,
          'path': '/给 Java 程序员的 Angular 指南',
          'summary': '# 给 Java 程序员的 Angular 系列教程\n\n',
          'creationDate': new Date('2018-09-29T02:41:09.000Z'),
        },
      ],
      'id': '',
      'title': '',
      'level': 0,
      'path': '',
      'creationDate': new Date('2018-09-29T02:41:09.000Z'),
    });
  });
});
