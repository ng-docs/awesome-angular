import { inject, TestBed } from '@angular/core/testing';

import { SetTitleGuard } from './set-title.guard';

describe('SetTitleGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SetTitleGuard],
    });
  });

  it('should ...', inject([SetTitleGuard], (guard: SetTitleGuard) => {
    expect(guard).toBeTruthy();
  }));
});
