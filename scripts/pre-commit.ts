import * as spawn from 'cross-spawn';
import * as path from 'path';
import * as fs from 'fs';

interface ChangeLog {
  action: string;
  filename: string;
}

function preCommit(): void {
  const stdout = spawn.sync('git', ['status', '--porcelain']).stdout as Buffer;
  const changes = stdout.toString('utf-8')
    .split(/\n/)
    .filter(it => !!it.trim())
    .map(it => parseLine(it));

  const markdownFiles = changes.filter(it => it.action === 'A' || it.action === 'AM')
    .filter(it => it.filename.startsWith('src/assets/content/articles'))
    .filter(it => path.extname(it.filename) === '.md');

  if (markdownFiles.length === 0) {
    process.exit(0);
  }

  if (markdownFiles.length > 1) {
    // tslint:disable-next-line:max-line-length
    console.error('In order to trace history, it is not allowed to add multiple markdown files to `src/assets/content/articles` in the same commit! Please add one by one!');
    console.error('为了便于追溯历史，不允许在同一个提交中往 `src/assets/content/articles` 下添加多个 markdown 文件！请逐个添加。');
    process.exit(1);
  }

  if (!fs.readFileSync(markdownFiles[0].filename, 'utf-8').trim()) {
    console.error('In order to trace history, it is not allowed to add a blank markdown file.');
    console.error('为了便于追溯历史，不允许添加空白的 markdown 文件。');
    process.exit(2);
  }
}

function parseLine(line: string): ChangeLog {
  const [_, action, filename] = line.match(/^ *(\S+)\s+(.*)$/);
  return {action, filename};
}

preCommit();
