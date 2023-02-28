import { TestBed } from '@angular/core/testing';

import { TakeawayService } from './takeaway.service';

describe('TakeawayService', () => {
  let service: TakeawayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TakeawayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
