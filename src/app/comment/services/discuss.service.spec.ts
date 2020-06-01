import { TestBed } from '@angular/core/testing';

import { DiscussService } from './discuss.service';

describe('DiscussService', () => {
  let service: DiscussService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscussService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
