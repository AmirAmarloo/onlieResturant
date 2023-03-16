import { TestBed } from '@angular/core/testing';

import { TableDefinitionService } from './table-definition.service';

describe('TableDefinationService', () => {
  let service: TableDefinitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableDefinitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
