import { TestBed } from '@angular/core/testing';

import { OutlineService } from './outline.service';

describe('OutlineService', () => {
  let service: OutlineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutlineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
