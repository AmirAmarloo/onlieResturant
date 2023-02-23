import { TestBed } from '@angular/core/testing';

import { TakeawayStuffService } from './takeaway-stuff.service';

describe('TakeawayStuffService', () => {
  let service: TakeawayStuffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TakeawayStuffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
