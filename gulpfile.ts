import { dest, src, task } from 'gulp';
import * as gft from 'gulp-file-tree';
import * as replace from 'gulp-replace';

task('articles', () => {
  src('./src/assets/content/articles/**/*.md')
    .pipe(gft())
    .pipe(replace(__dirname, '.'))
    .pipe(dest('./src/app/article/data'));
});

task('authors', () => {
  src('./src/assets/content/authors/**/*.md')
    .pipe(gft())
    .pipe(replace(__dirname, '.'))
    .pipe(dest('./src/app/author/data'));
});

task('default', ['articles', 'authors']);
