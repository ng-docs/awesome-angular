import { CommentCountPipe } from './comment-count.pipe';

describe('CommentCountPipe', () => {
  it('create an instance', () => {
    const pipe = new CommentCountPipe();
    expect(pipe).toBeTruthy();
  });
});
