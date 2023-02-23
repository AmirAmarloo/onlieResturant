import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickTakewayStuffComponent } from './pick-takeway-stuff.component';

describe('PickTakewayStuffComponent', () => {
  let component: PickTakewayStuffComponent;
  let fixture: ComponentFixture<PickTakewayStuffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickTakewayStuffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickTakewayStuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
