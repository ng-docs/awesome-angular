import { TestBed } from '@angular/core/testing';

import { PartialScroller } from './partial-scroller.service';

describe('PartialScroller', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartialScroller = TestBed.get(PartialScroller);
    expect(service).toBeTruthy();
  });
});
