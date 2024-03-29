import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDefinitionComponent } from './table-definition.component';

describe('TableDefinitionComponent', () => {
  let component: TableDefinitionComponent;
  let fixture: ComponentFixture<TableDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDefinitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
