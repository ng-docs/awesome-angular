import { expect } from 'chai';
import { buildUuid, findFilesWithDuplicateIds, parseAuthor, parseCommit, splitGitLog } from './tree-builder';
import { FileCommitModel } from './file-commit.model';
import { FileModel } from './file.model';

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

describe('parse git log', () => {
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
});
