import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationDefinitionComponent } from './reservation-definition.component';

describe('ReservationDefinitionComponent', () => {
  let component: ReservationDefinitionComponent;
  let fixture: ComponentFixture<ReservationDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationDefinitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
