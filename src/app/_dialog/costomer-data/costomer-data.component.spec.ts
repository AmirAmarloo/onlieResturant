import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostomerDataComponent } from './costomer-data.component';

describe('CostomerDataComponent', () => {
  let component: CostomerDataComponent;
  let fixture: ComponentFixture<CostomerDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostomerDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostomerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
