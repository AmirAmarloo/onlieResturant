import { TestBed } from '@angular/core/testing';

import { ReservationDefinationService } from './reservation-defination.service';

describe('ReservationDefinationService', () => {
  let service: ReservationDefinationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationDefinationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
