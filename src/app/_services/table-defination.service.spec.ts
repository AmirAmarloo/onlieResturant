import { TestBed } from '@angular/core/testing';

import { TableDefinationService } from './table-defination.service';

describe('TableDefinationService', () => {
  let service: TableDefinationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableDefinationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
